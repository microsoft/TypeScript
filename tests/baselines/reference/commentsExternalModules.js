//// [tests/cases/compiler/commentsExternalModules.ts] ////

//// [commentsExternalModules_0.ts]
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
import extMod = require("commentsExternalModules_0"); // trailing comment1
extMod.m1.fooExport();
var newVar = new extMod.m1.m2.c();
extMod.m4.fooExport();
var newVar2 = new extMod.m4.m2.c();


//// [commentsExternalModules_0.js]
define(["require", "exports"], function (require, exports) {
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
    })(m1 || (exports.m1 = m1 = {}));
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
    })(m4 || (exports.m4 = m4 = {}));
    m4.fooExport();
    var myvar2 = new m4.m2.c();
});
//// [commentsExternalModules_1.js]
define(["require", "exports", "commentsExternalModules_0"], function (require, exports, extMod) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    extMod.m1.fooExport();
    var newVar = new extMod.m1.m2.c();
    extMod.m4.fooExport();
    var newVar2 = new extMod.m4.m2.c();
});


//// [commentsExternalModules_0.d.ts]
/** Module comment*/
export declare namespace m1 {
    /** b's comment*/
    var b: number;
    /** m2 comments*/
    namespace m2 {
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
export declare namespace m4 {
    /** b's comment */
    var b: number;
    /** m2 comments
    */
    namespace m2 {
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
export {};
