// @strict: true
// @checkJs: true
// @target: esnext
// @noEmit: true

// @filename: index.js

export class BaseProduct {
  Price = 0;
}

export class Product extends BaseProduct {
  Compute() {
    this.Price = Number(this.Price);
  }
}

export class Annotated {
  Compute() {
    /** @type {number} */
    this.Price = this.Price + 1;
  }
}
