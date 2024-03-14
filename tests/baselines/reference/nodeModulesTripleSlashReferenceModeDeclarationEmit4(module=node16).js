//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit4.ts] ////

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
/// <reference types="pkg" resolution-mode="import" preserve="true" />
export interface LocalInterface extends ImportInterface {}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" resolution-mode="import" preserve="true" />


//// [index.d.ts]
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends ImportInterface {
}


//// [DtsFileErrors]


out/index.d.ts(2,41): error TS2304: Cannot find name 'ImportInterface'.


==== out/index.d.ts (1 errors) ====
    /// <reference types="pkg" preserve="true" />
    export interface LocalInterface extends ImportInterface {
                                            ~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'ImportInterface'.
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