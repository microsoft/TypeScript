//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit3.ts] ////

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
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface {}
}
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
/// <reference types="pkg" resolution-mode="require"/>
export interface LocalInterface extends RequireInterface {}

//// [index.js]
/// <reference types="pkg" resolution-mode="require"/>
export {};


//// [index.d.ts]
export interface LocalInterface extends RequireInterface {
}


//// [DtsFileErrors]


out/index.d.ts(1,41): error TS2304: Cannot find name 'RequireInterface'.


==== out/index.d.ts (1 errors) ====
    export interface LocalInterface extends RequireInterface {
                                            ~~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'RequireInterface'.
    }
    
==== /node_modules/pkg/package.json (0 errors) ====
    {
        "name": "pkg",
        "version": "0.0.1",
        "exports": {
            "import": "./import.js",
            "require": "./require.js"
        }
    }
==== /node_modules/pkg/import.d.ts (0 errors) ====
    export {};
    declare global {
        interface ImportInterface {}
    }
==== /node_modules/pkg/require.d.ts (0 errors) ====
    export {};
    declare global {
        interface RequireInterface {}
    }
==== /package.json (0 errors) ====
    {
        "private": true,
        "type": "module"
    }