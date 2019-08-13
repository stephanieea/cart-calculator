const assert = require('chai').assert;
const CartCalculator = require('../index.js');

describe('CartCalculator', () => {
  it('is a function', () => {
    assert.isFunction(CartCalculator);
  });

  it('can be instantiated', () => {
    const cartCalculator = new CartCalculator();
    assert.isObject(cartCalculator);
  });


  it('will calculate the correct number of total books', () => {
    const cartCalculator = new CartCalculator({ book1: 3, book2: 1, book3: 2 });
    const totalBooks = cartCalculator.countBooksTotal();
    assert.equal(totalBooks, 6);
  });

  it('will determine the correct discount percentage given a unique book total', () => {
    const cartCalculator = new CartCalculator();
    const discountPercentageForOneUnique = cartCalculator.determineDiscountValueForASet(1).toFixed(2);
    const discountPercentageForTwoUnique = cartCalculator.determineDiscountValueForASet(2).toFixed(2);
    const discountPercentageForThreeUnique = cartCalculator.determineDiscountValueForASet(3).toFixed(2);
    const discountPercentageForFourUnique = cartCalculator.determineDiscountValueForASet(4).toFixed(2);
    const discountPercentageForFiveUnique = cartCalculator.determineDiscountValueForASet(5).toFixed(2);
    assert.equal(discountPercentageForOneUnique, 0);
    assert.equal(discountPercentageForTwoUnique, .8);
    assert.equal(discountPercentageForThreeUnique, 2.4);
    assert.equal(discountPercentageForFourUnique, 6.4);
    assert.equal(discountPercentageForFiveUnique, 10);
  });

  it('will return a price of 0 if there are no items in the cart', () => {
    const cartCalculator = new CartCalculator();
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 0);
  });

  it('will return the correct price with no discounts for multiple copies of the same book', () => {
    const cartCalculator = new CartCalculator({ book1: 10 });
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 80);
  });

  it('will return the correct set values for carts with multiple copies of multiple books', () => {
    const cartCalculator = new CartCalculator({ book1: 2, book2: 3, book3: 1 });
    const booksInEachSet = cartCalculator.mapNumberOfUniqueBooksForEachSet();
    assert.deepEqual(booksInEachSet, { 0: 3, 1: 2, 2: 1 });
  });

  it('will return the correct price, with a 5% discount for two unique books', () => {
    const cartCalculator = new CartCalculator({ book1: 1, book2: 1 });
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 15.2);
  });

  it('will return the correct price, with a 5% discount for two unique books and full price for an additional copy,', () => {
    const cartCalculator = new CartCalculator({ book1: 2, book2: 1 });
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 23.2);
  });

  it('will return the correct price value for carts with multiple copies of multiple books', () => {
    const cartCalculator = new CartCalculator({ book1: 2, book2: 3, book3: 1 });
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 44.8);
  });

  it('will return the correct price, with a 25% discount for five unique books, and charging full price for three additional copies,', () => {
    const cartCalculator = new CartCalculator({
      book1: 2,
      book2: 2,
      book3: 2,
      book4: 1,
      book5: 1,
    });
    const total = cartCalculator.calculateTotal();
    assert.equal(total, 51.20);
  });
})