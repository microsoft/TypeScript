// @module: nodenext
// @importHelpers: true
// @target: es2021

// @Filename: /node_modules/tslib/index.d.ts
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

// @Filename: /node_modules/tslib/index.d.mts
export { __classPrivateFieldGet } from "./index.js";

// @Filename: /node_modules/tslib/package.json
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

// @Filename: /index.mts
export class Foo {
  constructor() {
    console.log(Foo.#test());
  }

  static #test() {
    return 'success';
  }
}
