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
    class b {
    }
    multiM.b = b;
    // class d
    class d {
    }
    multiM.d = d;
})(multiM || (multiM = {}));
/// this is multi module 2
(function (multiM) {
    /** class c comment*/
    class c {
    }
    multiM.c = c;
    /// class e
    class e {
    }
    multiM.e = e;
})(multiM || (multiM = {}));
new multiM.b();
new multiM.c();
