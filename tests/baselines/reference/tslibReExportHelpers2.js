//// [tests/cases/compiler/tslibReExportHelpers2.ts] ////

//// [index.d.ts]
export declare function __classPrivateFieldGet<T extends object, V>(
  receiver: T,
  state: { has(o: T): boolean, get(o: T): V | undefined },
  kind?: "f"
): V;
export declare function __classPrivateFieldGet<T extends new (...args: any[]) => unknown, V>(
  receiver: T,
  state: T,
  kind: "f",
  f: { value: V }
): V;

//// [index.d.mts]
export { __classPrivateFieldGet } from "./index.js";

//// [package.json]
{
    "name": "tslib",
    "version": "1.0.0",
    "types": "index.d.ts",
    "exports": {
        ".": {
            "types": {
                "import": "./index.d.mts",
                "default": "./index.d.ts"
            }
        }
    }
}

//// [index.mts]
export class Foo {
  constructor() {
    console.log(Foo.#test());
  }

  static #test() {
    return 'success';
  }
}


//// [index.mjs]
var _a, _Foo_test;
import { __classPrivateFieldGet } from "tslib";
export class Foo {
    constructor() {
        console.log(__classPrivateFieldGet(_a, _a, "m", _Foo_test).call(_a));
    }
}
_a = Foo, _Foo_test = function _Foo_test() {
    return 'success';
};
