// @strict: true
// @target: es2021

// https://github.com/microsoft/TypeScript/issues/61109

class Cls {
  #privateProp: number | undefined;

  problem() {
    this.#privateProp ??= false ? neverThis() : 20;
  }
}

function neverThis(): never {
  throw new Error("This should really really never happen!");
}
