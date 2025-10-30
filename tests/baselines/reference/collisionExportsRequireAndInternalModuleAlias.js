//// [tests/cases/compiler/collisionExportsRequireAndInternalModuleAlias.ts] ////

//// [collisionExportsRequireAndInternalModuleAlias.ts]
export namespace m {
    export class c {
    }
}
import exports = m.c;
import require = m.c;
new exports();
new require();

namespace m1 {
    import exports = m.c;
    import require = m.c;
    new exports();
    new require();
}

namespace m2 {
    export import exports = m.c;
    export import require = m.c;
    new exports();
    new require();
}

//// [collisionExportsRequireAndInternalModuleAlias.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.m = void 0;
    var m;
    (function (m) {
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m.c = c;
    })(m || (exports.m = m = {}));
    var exports = m.c;
    var require = m.c;
    new exports();
    new require();
    var m1;
    (function (m1) {
        var exports = m.c;
        var require = m.c;
        new exports();
        new require();
    })(m1 || (m1 = {}));
    var m2;
    (function (m2) {
        m2.exports = m.c;
        m2.require = m.c;
        new m2.exports();
        new m2.require();
    })(m2 || (m2 = {}));
});
