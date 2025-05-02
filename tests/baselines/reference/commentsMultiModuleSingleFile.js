//// [tests/cases/compiler/commentsMultiModuleSingleFile.ts] ////

//// [commentsMultiModuleSingleFile.ts]
/** this is multi declare module*/
module multiM {
    /** class b*/
    export class b {
    }

    // class d
    export class d {
    }
}

/// this is multi module 2
module multiM {
    /** class c comment*/
    export class c {
    }

    /// class e
    export class e {
    }
}
new multiM.b();
new multiM.c();

//// [commentsMultiModuleSingleFile.js]
/** this is multi declare module*/
var multiM;
(function (multiM) {
    /** class b*/
    var b = /** @class */ (function () {
        function b() {
        }
        return b;
    }());
    multiM.b = b;
    // class d
    var d = /** @class */ (function () {
        function d() {
        }
        return d;
    }());
    multiM.d = d;
})(multiM || (multiM = {}));
/// this is multi module 2
(function (multiM) {
    /** class c comment*/
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    multiM.c = c;
    /// class e
    var e = /** @class */ (function () {
        function e() {
        }
        return e;
    }());
    multiM.e = e;
})(multiM || (multiM = {}));
new multiM.b();
new multiM.c();


//// [commentsMultiModuleSingleFile.d.ts]
/** this is multi declare module*/
declare namespace multiM {
    /** class b*/
    class b {
    }
    class d {
    }
}
declare namespace multiM {
    /** class c comment*/
    class c {
    }
    class e {
    }
}
