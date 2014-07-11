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
var multiM;
(function (multiM) {
    var b = (function () {
        function b() {
        }
        return b;
    })();
    multiM.b = b;
    var d = (function () {
        function d() {
        }
        return d;
    })();
    multiM.d = d;
})(multiM || (multiM = {}));
var multiM;
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
})(multiM || (multiM = {}));
new multiM.b();
new multiM.c();


//// [commentsMultiModuleSingleFile.d.ts]
declare module multiM {
    class b {
    }
    class d {
    }
}
declare module multiM {
    class c {
    }
    class e {
    }
}
