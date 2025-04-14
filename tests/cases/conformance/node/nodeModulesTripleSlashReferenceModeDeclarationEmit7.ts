// @noImplicitReferences: true
// @module: node16,node18,nodenext
// @declaration: true
// @outDir: out
// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
// @filename: /node_modules/pkg/import.d.ts
export {};
declare global {
    interface ImportInterface { _i: any; }
    function getInterI(): ImportInterface;
}
// @filename: /node_modules/pkg/require.d.ts
export {};
declare global {
    interface RequireInterface { _r: any; }
    function getInterR(): RequireInterface;
}
// @filename: /sub1/uses.ts
/// <reference types="pkg" preserve="true" />
export default getInterI();
// @filename: /sub1/package.json
{
    "private": true,
    "type": "module"
}
// @filename: /sub2/uses.ts
/// <reference types="pkg" preserve="true" />
export default getInterR();
// @filename: /sub2/package.json
{
    "private": true,
    "type": "commonjs"
}
// @filename: /package.json
{
    "private": true,
    "type": "module"
}
// @filename: /index.ts
// only an esm file can `import` both kinds of files
import obj1 from "./sub1/uses.js"
import obj2 from "./sub2/uses.js"
export default [obj1, obj2.default] as const;