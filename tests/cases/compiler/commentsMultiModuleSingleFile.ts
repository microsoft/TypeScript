// @target: ES5
// @declaration: true
// @removeComments: false

/** this is multi declare module*/
namespace multiM {
    /** class b*/
    export class b {
    }

    // class d
    export class d {
    }
}

/// this is multi module 2
namespace multiM {
    /** class c comment*/
    export class c {
    }

    /// class e
    export class e {
    }
}
new multiM.b();
new multiM.c();