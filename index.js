class CartCalculator {
  constructor(cart) {
      this.cart = cart;
  }

  calculateTotal() {
    if (!this.cart) return 0;
  }
}

module.exports = CartCalculator;