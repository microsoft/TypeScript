//// [tests/cases/compiler/ambientExternalModuleWithInternalImportDeclaration.ts] ////

//// [ambientExternalModuleWithInternalImportDeclaration_0.ts]
declare module 'M' {
    module C {
        export var f: number;
    }
    class C {
        foo(): void;
    }
    import X = C;
    export = X;

}

//// [ambientExternalModuleWithInternalImportDeclaration_1.ts]
///<reference path='ambientExternalModuleWithInternalImportDeclaration_0.ts'/>
import A = require('M');
var c = new A();

//// [ambientExternalModuleWithInternalImportDeclaration_0.js]
//// [ambientExternalModuleWithInternalImportDeclaration_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='ambientExternalModuleWithInternalImportDeclaration_0.ts'/>
const A = require("M");
var c = new A();
