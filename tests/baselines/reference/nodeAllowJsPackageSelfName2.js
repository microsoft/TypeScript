//// [tests/cases/conformance/node/allowJs/nodeAllowJsPackageSelfName2.ts] ////

//// [package.json]
{
  "name": "js-self-name-import",
  "type": "module",
  "exports": {
  "./src/*": {
    "types": "./types/src/*",
    "default": "./src/*"
  },
  "./test/*": {
    "types": "./types/test/*",
    "default": "./test/*"
  }
}
}

//// [foo.d.ts]
export const foo: 1;

//// [foo.d.ts]
export {};

//// [foo.js]
export const foo = 1;

//// [foo.js]
import { foo } from "js-self-name-import/foo.js";




//// [foo.d.ts]
export const foo: 1;
//// [foo.d.ts]
export {};
