//// [tests/cases/compiler/commentsMultiModuleMultiFile.ts] ////

//// [commentsMultiModuleMultiFile_0.ts]

/** this is multi declare module*/
export module multiM {
    /// class b comment
    export class b {
    }
}
/** thi is multi module 2*/
export module multiM {
    /** class c comment*/
    export class c {
    }

    // class e comment
    export class e {
    }
}

new multiM.b();
new multiM.c();

//// [commentsMultiModuleMultiFile_1.ts]
import m = require('commentsMultiModuleMultiFile_0');
/** this is multi module 3 comment*/
export module multiM {
    /** class d comment*/
    export class d {
    }

    /// class f comment
    export class f {
    }
}
new multiM.d();

//// [commentsMultiModuleMultiFile_0.js]
define(["require", "exports"], function (require, exports) {
    (function (multiM) {
        var b = (function () {
            function b() {
            }
            return b;
        })();
        multiM.b = b;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    (function (multiM) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        multiM.c = c;
        var e = (function () {
            function e() {
            }
            return e;
        })();
        multiM.e = e;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    new multiM.b();
    new multiM.c();
});
//// [commentsMultiModuleMultiFile_1.js]
define(["require", "exports"], function (require, exports) {
    (function (multiM) {
        var d = (function () {
            function d() {
            }
            return d;
        })();
        multiM.d = d;
        var f = (function () {
            function f() {
            }
            return f;
        })();
        multiM.f = f;
    })(exports.multiM || (exports.multiM = {}));
    var multiM = exports.multiM;
    new multiM.d();
});


//// [commentsMultiModuleMultiFile_0.d.ts]
export declare module multiM {
    class b {
    }
}
export declare module multiM {
    class c {
    }
    class e {
    }
}
//// [commentsMultiModuleMultiFile_1.d.ts]
export declare module multiM {
    class d {
    }
    class f {
    }
}
