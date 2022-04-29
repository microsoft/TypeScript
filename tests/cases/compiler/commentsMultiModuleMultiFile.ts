// @module: amd
// @target: ES5
// @declaration: true
// @removeComments: false

// @Filename: commentsMultiModuleMultiFile_0.ts
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

// @Filename: commentsMultiModuleMultiFile_1.ts
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