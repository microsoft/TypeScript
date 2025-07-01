//// [tests/cases/compiler/subpathImportDeclarationEmit.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "imports": {
    "#subpath": "./src/subpath.ts"
  },
  "exports": {
    "./*": "./dist/*"
  }
}

//// [subpath.ts]
async function bar(): Promise<string> {
  return "bar";
}
export const barrel = { bar };

//// [indirect.ts]
import { barrel } from "#subpath";
const { bar } = barrel;
export { bar };

//// [main.ts]
import { bar } from "./indirect.js";
console.log(await bar());


//// [subpath.js]
async function bar() {
    return "bar";
}
export const barrel = { bar };
//// [indirect.js]
import { barrel } from "#subpath";
const { bar } = barrel;
export { bar };
//// [main.js]
import { bar } from "./indirect.js";
console.log(await bar());


//// [subpath.d.ts]
declare function bar(): Promise<string>;
export declare const barrel: {
    bar: typeof bar;
};
export {};
//// [indirect.d.ts]
declare const bar: () => Promise<string>;
export { bar };
//// [main.d.ts]
export {};
