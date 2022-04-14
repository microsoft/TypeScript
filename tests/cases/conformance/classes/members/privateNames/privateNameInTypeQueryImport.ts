// @strict: true
// @target: esnext

// @filename: main.ts
export class Foo {
  static #m = 1;
  static #f(x: typeof import("./lib").Bar.#m) {}
}

// @filename: lib.ts
export { Foo as Bar } from "./main";
