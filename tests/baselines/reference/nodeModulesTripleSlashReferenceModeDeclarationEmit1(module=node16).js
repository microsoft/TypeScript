//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit1.ts] ////

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
//// [index.ts]
/// <reference types="pkg" />
export interface LocalInterface extends RequireInterface {}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" />


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