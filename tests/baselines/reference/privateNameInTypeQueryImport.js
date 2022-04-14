//// [tests/cases/conformance/classes/members/privateNames/privateNameInTypeQueryImport.ts] ////

//// [main.ts]
export class Foo {
  static #m = 1;
  static #f(x: typeof import("./lib").Bar.#m) {}
}

//// [lib.ts]
export { Foo as Bar } from "./main";


//// [lib.js]
export { Foo as Bar } from "./main";
//// [main.js]
export class Foo {
    static #m = 1;
    static #f(x) { }
}
