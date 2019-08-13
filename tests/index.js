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
})