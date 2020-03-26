//// [tests/cases/compiler/commentsExternalModules3.ts] ////

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
import extMod = require("./commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
export var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
export var newVar2 = new extMod.m4.m2.c();


//// [commentsExternalModules2_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m4 = exports.m1 = void 0;
/** Module comment*/
var m1;
(function (m1) {
    /** foo's comment*/
    function foo() {
        return m1.b;
    }
    /** m2 comments*/
    var m2;
    (function (m2) {
        /** class comment;*/
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m2.c = c;
        ;
        /** i*/
        m2.i = new c();
    })(m2 = m1.m2 || (m1.m2 = {}));
    /** exported function*/
    function fooExport() {
        return foo();
    }
    m1.fooExport = fooExport;
})(m1 = exports.m1 || (exports.m1 = {}));
m1.fooExport();
var myvar = new m1.m2.c();
/** Module comment */
var m4;
(function (m4) {
    /** foo's comment
    */
    function foo() {
        return m4.b;
    }
    /** m2 comments
    */
    var m2;
    (function (m2) {
        /** class comment; */
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m2.c = c;
        ;
        /** i */
        m2.i = new c();
    })(m2 = m4.m2 || (m4.m2 = {}));
    /** exported function */
    function fooExport() {
        return foo();
    }
    m4.fooExport = fooExport;
})(m4 = exports.m4 || (exports.m4 = {}));
m4.fooExport();
var myvar2 = new m4.m2.c();
//// [commentsExternalModules_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVar2 = exports.newVar = void 0;
/**This is on import declaration*/
var extMod = require("./commentsExternalModules2_0"); // trailing comment 1
extMod.m1.fooExport();
exports.newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
exports.newVar2 = new extMod.m4.m2.c();


//// [commentsExternalModules2_0.d.ts]
/** Module comment*/
export declare module m1 {
    /** b's comment*/
    var b: number;
    /** m2 comments*/
    module m2 {
        /** class comment;*/
        class c {
        }
        /** i*/
        var i: c;
    }
    /** exported function*/
    function fooExport(): number;
}
/** Module comment */
export declare module m4 {
    /** b's comment */
    var b: number;
    /** m2 comments
    */
    module m2 {
        /** class comment; */
        class c {
        }
        /** i */
        var i: c;
    }
    /** exported function */
    function fooExport(): number;
}
//// [commentsExternalModules_1.d.ts]
/**This is on import declaration*/
import extMod = require("./commentsExternalModules2_0");
export declare var newVar: extMod.m1.m2.c;
export declare var newVar2: extMod.m4.m2.c;
