//// [collisionExportsRequireAndInternalModuleAlias.ts]
export module m {
    export class c {
    }
}
import exports = m.c;
import require = m.c;
new exports();
new require();

module m1 {
    import exports = m.c;
    import require = m.c;
    new exports();
    new require();
}

module m2 {
    export import exports = m.c;
    export import require = m.c;
    new exports();
    new require();
}

//// [collisionExportsRequireAndInternalModuleAlias.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.m = void 0;
    var m;
    (function (m) {
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        m.c = c;
    })(m = exports.m || (exports.m = {}));
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
