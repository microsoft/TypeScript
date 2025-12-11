//// [tests/cases/conformance/node/nodeModulesPackageImportsRootWildcardNode16.ts] ////

//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "imports": {
        "#/*": "./src/*"
    }
}
//// [foo.ts]
export const foo = "foo";
//// [index.ts]
// esm format file
import { foo } from "#/foo.js";
foo;


//// [foo.js]
export const foo = "foo";
//// [index.js]
// esm format file
import { foo } from "#/foo.js";
foo;


//// [foo.d.ts]
export declare const foo = "foo";
//// [index.d.ts]
export {};
