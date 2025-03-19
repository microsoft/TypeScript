//// [tests/cases/compiler/commentsExternalModules2.ts] ////

//// [commentsExternalModules2_0.ts]
/** Module comment*/
export module m1 {
    /** b's comment*/
    export var b: number;
    /** foo's comment*/
    function foo() {
        return b;
    }
    /** m2 comments*/
    export module m2 {
        /** class comment;*/
        export class c {
        };
        /** i*/
        export var i = new c();
    }
    /** exported function*/
    export function fooExport() {
        return foo();
    }
}
m1.fooExport();
var myvar = new m1.m2.c();

/** Module comment */
export module m4 {
    /** b's comment */
    export var b: number;
    /** foo's comment
    */
    function foo() {
        return b;
    }
    /** m2 comments
    */
    export module m2 {
        /** class comment; */
        export class c {
        };
        /** i */
        export var i = new c();
    }
    /** exported function */
    export function fooExport() {
        return foo();
    }
}
m4.fooExport();
var myvar2 = new m4.m2.c();

//// [commentsExternalModules_1.ts]
/**This is on import declaration*/
import extMod = require("commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
export var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
export var newVar2 = new extMod.m4.m2.c();


//// [commentsExternalModules_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVar2 = exports.newVar = void 0;
/**This is on import declaration*/
const extMod = require("commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
exports.newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
exports.newVar2 = new extMod.m4.m2.c();
