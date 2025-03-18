//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit6.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export {};
declare global {
    interface ImportInterface {}
    function getInterI(): ImportInterface;
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface {}
    function getInterR(): RequireInterface;
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterR();
//// [index.ts]
import obj from "./uses.js"
export default (obj as typeof obj);

//// [uses.js]
export default getInterR();
//// [index.js]
import obj from "./uses.js";
export default obj;
