//// [commentsMultiModuleMultiFile_0.js]
define(["require", "exports"], function(require, exports) {
    /** this is multi declare module*/
    (function (multiM) {
        /// class b comment
        var b = (function () {
            function b() {
            }
            return b;
        })();
        multiM.b = b;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;

    /** thi is multi module 2*/
    var multiM;
    (function (multiM) {
        /** class c comment*/
        var c = (function () {
            function c() {
            }
            return c;
        })();
        multiM.c = c;

        // class e comment
        var e = (function () {
            function e() {
            }
            return e;
        })();
        multiM.e = e;
    })(multiM || (multiM = {}));

    new multiM.b();
    new multiM.c();
});
//// [commentsMultiModuleMultiFile_1.js]
define(["require", "exports"], function(require, exports) {
    /** this is multi module 3 comment*/
    var multiM;
    (function (multiM) {
        /** class d comment*/
        var d = (function () {
            function d() {
            }
            return d;
        })();
        multiM.d = d;

        /// class f comment
        var f = (function () {
            function f() {
            }
            return f;
        })();
        multiM.f = f;
    })(multiM || (multiM = {}));
    new multiM.d();
});


////[commentsMultiModuleMultiFile_0.d.ts]
/** this is multi declare module*/
export declare module multiM {
    class b {
    }
}
////[commentsMultiModuleMultiFile_1.d.ts]
