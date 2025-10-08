// @module: commonjs
// @target: ES5
// @declaration: true
// @removeComments: false

// @Filename: commentsExternalModules2_0.ts
/** Module comment*/
export namespace m1 {
    /** b's comment*/
    export var b: number;
    /** foo's comment*/
    function foo() {
        return b;
    }
    /** m2 comments*/
    export namespace m2 {
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
export namespace m4 {
    /** b's comment */
    export var b: number;
    /** foo's comment
    */
    function foo() {
        return b;
    }
    /** m2 comments
    */
    export namespace m2 {
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
import extMod = require("./commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
export var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
export var newVar2 = new extMod.m4.m2.c();
