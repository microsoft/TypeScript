//// [tests/cases/compiler/collisionExportsRequireAndModule.ts] ////

//// [collisionExportsRequireAndModule_externalmodule.ts]
export namespace require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export namespace exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
namespace m1 {
    namespace require {
        export interface I {
        }
        export class C {
        }
    }
    namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}
namespace m2 {
    export namespace require {
        export interface I {
        }
        export class C {
        }
    }
    export namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}

//// [collisionExportsRequireAndModule_globalFile.ts]
namespace require {
    export interface I {
    }
    export class C {
    }
}
namespace exports {
    export interface I {
    }
    export class C {
    }
}
namespace m3 {
    namespace require {
        export interface I {
        }
        export class C {
        }
    }
    namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}
namespace m4 {
    export namespace require {
        export interface I {
        }
        export class C {
        }
    }
    export namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}


//// [collisionExportsRequireAndModule_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exports = exports.require = void 0;
    exports.foo = foo;
    exports.foo2 = foo2;
    var require;
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require || (exports.require = require = {}));
    function foo() {
        return null;
    }
    var exports;
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports || (exports.exports = exports = {}));
    function foo2() {
        return null;
    }
    var m1;
    (function (m1) {
        var require;
        (function (require) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            require.C = C;
        })(require || (require = {}));
        var exports;
        (function (exports) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports.C = C;
        })(exports || (exports = {}));
    })(m1 || (m1 = {}));
    var m2;
    (function (m2) {
        var require;
        (function (require) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            require.C = C;
        })(require = m2.require || (m2.require = {}));
        var exports;
        (function (exports) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports.C = C;
        })(exports = m2.exports || (m2.exports = {}));
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndModule_globalFile.js]
var require;
(function (require) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    require.C = C;
})(require || (require = {}));
var exports;
(function (exports) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
})(exports || (exports = {}));
var m3;
(function (m3) {
    var require;
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require || (require = {}));
    var exports;
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports || (exports = {}));
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    var require;
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require = m4.require || (m4.require = {}));
    var exports;
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports = m4.exports || (m4.exports = {}));
})(m4 || (m4 = {}));
