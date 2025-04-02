//// [tests/cases/compiler/importDeclWithClassModifiers.ts] ////

//// [importDeclWithClassModifiers.ts]
module x {
    interface c {
    }
}
export public import a = x.c;
export private import b = x.c;
export static import c = x.c;
var b: a;


//// [importDeclWithClassModifiers.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = exports.b = exports.a = void 0;
    exports.a = x.c;
    exports.b = x.c;
    exports.c = x.c;
    var b;
});
