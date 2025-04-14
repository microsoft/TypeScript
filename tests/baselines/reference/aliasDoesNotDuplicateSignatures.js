//// [tests/cases/compiler/aliasDoesNotDuplicateSignatures.ts] ////

//// [demo.d.ts]
declare namespace demoNS {
    function f(): void;
}
declare module 'demoModule' {
    import alias = demoNS;
    export = alias;
}
//// [user.ts]
import { f } from 'demoModule';
// Assign an incorrect type here to see the type of 'f'.
let x1: string = demoNS.f;
let x2: string = f;

//// [user.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demoModule_1 = require("demoModule");
// Assign an incorrect type here to see the type of 'f'.
var x1 = demoNS.f;
var x2 = demoModule_1.f;
