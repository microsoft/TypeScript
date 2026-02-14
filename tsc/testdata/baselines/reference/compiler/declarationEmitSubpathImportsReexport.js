//// [tests/cases/compiler/declarationEmitSubpathImportsReexport.ts] ////

//// [package.json]
{
  "name": "package-b",
  "type": "module",
  "exports": {
    ".": "./index.js"
  }
}

//// [index.js]
export {};

//// [index.d.ts]
export interface B {
	b: "b";
}

//// [package.json]
{
  "name": "package-a",
  "type": "module",
  "imports": {
    "#re_export": "./src/re_export.ts"
  },
  "exports": {
    ".": "./dist/index.js"
  }
}


//// [re_export.ts]
import type { B } from "package-b";
declare function foo(): Promise<B>
export const re = { foo };

//// [index.ts]
import { re } from "#re_export";
const { foo } = re;
export { foo };




//// [re_export.js]
export const re = { foo };
//// [index.js]
import { re } from "#re_export";
const { foo } = re;
export { foo };


//// [re_export.d.ts]
import type { B } from "package-b";
declare function foo(): Promise<B>;
export declare const re: {
    foo: typeof foo;
};
export {};
//// [index.d.ts]
declare const foo: () => Promise<import("package-b").B>;
export { foo };
