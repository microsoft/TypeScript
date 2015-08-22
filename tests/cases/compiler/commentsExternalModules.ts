// @module: amd
// @target: ES5
// @declaration: true
// @removeComments: false

// @Filename: commentsExternalModules_0.ts
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

// @Filename: commentsExternalModules_1.ts
/**This is on import declaration*/
import extMod = require("commentsExternalModules_0"); // trailing comment1
extMod.m1.fooExport();
var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
var newVar2 = new extMod.m4.m2.c();
