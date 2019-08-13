class CartCalculator {
  constructor(cart) {
    this.cart = cart;
    this.bookFullPrice = 8;
  }

  countBooksTotal() {
    if (!this.cart) return 0;
    return Object.values(this.cart).reduce((a, b) => a + b, 0);
  }

  determineDiscountValueForASet(num) {
    const fullPriceValue = this.bookFullPrice * num;
    switch(num) {
      case(2): 
        return .05 * fullPriceValue;
      case(3):
        return .10 * fullPriceValue;
      case(4):
        return .20 * fullPriceValue;
      case(5):
        return .25 * fullPriceValue;
      default:
        return 0;
    }
  }


  mapNumberOfUniqueBooksForEachSet() {
    const setCount = Math.max(...Object.values(this.cart));
    const booksInASet = {};
    for (let i = 0; i < setCount; i++) {
      booksInASet[i] = 0;
      if (Object.values(this.cart).forEach((num) => {
        if (num > i) {
          booksInASet[i] += 1;
        }
      }));
    }
    return booksInASet;
  }

  calculateTotal() {
    if (!this.cart) return 0;
    const fullPriceValue = this.countBooksTotal() * this.bookFullPrice;
    const booksInEachSet = this.mapNumberOfUniqueBooksForEachSet();
    const discountValue = Object.values(booksInEachSet)
      .reduce((acc, curr) => this.determineDiscountValueForASet(curr) + acc, 0)
    return fullPriceValue - discountValue;
  }
}

module.exports = CartCalculator;