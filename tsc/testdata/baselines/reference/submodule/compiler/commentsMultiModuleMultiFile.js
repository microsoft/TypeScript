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

//// [commentsMultiModuleMultiFile_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiM = void 0;
/** this is multi module 3 comment*/
var multiM;
(function (multiM) {
    /** class d comment*/
    class d {
    }
    multiM.d = d;
    /// class f comment
    class f {
    }
    multiM.f = f;
})(multiM || (exports.multiM = multiM = {}));
new multiM.d();
