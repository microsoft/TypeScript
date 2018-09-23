//// [tests/cases/compiler/collisionExportsRequireAndModule.ts] ////

//// [collisionExportsRequireAndModule_externalmodule.ts]
export module require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export module exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
module m1 {
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m2 {
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}

//// [collisionExportsRequireAndModule_globalFile.ts]
module require {
    export interface I {
    }
    export class C {
    }
}
module exports {
    export interface I {
    }
    export class C {
    }
}
module m3 {
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m4 {
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}


//// [collisionExportsRequireAndModule_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var require = {};
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require);
    function foo() {
        return null;
    }
    exports.foo = foo;
    var exports = {};
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports);
    function foo2() {
        return null;
    }
    exports.foo2 = foo2;
    var m1 = {};
    (function (m1) {
        var require = require || (require = {});
        (function (require) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            require.C = C;
        })(require);
        var exports = exports || (exports = {});
        (function (exports) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports.C = C;
        })(exports);
    })(m1);
    var m2 = {};
    (function (m2) {
        var require = m2.require || (m2.require = {});
        (function (require) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            require.C = C;
        })(require);
        var exports = m2.exports || (m2.exports = {});
        (function (exports) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports.C = C;
        })(exports);
    })(m2);
});
//// [collisionExportsRequireAndModule_globalFile.js]
var require = require || (require = {});
(function (require) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    require.C = C;
})(require);
var exports = exports || (exports = {});
(function (exports) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
})(exports);
var m3 = m3 || (m3 = {});
(function (m3) {
    var require = require || (require = {});
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require);
    var exports = exports || (exports = {});
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports);
})(m3);
var m4 = m4 || (m4 = {});
(function (m4) {
    var require = m4.require || (m4.require = {});
    (function (require) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        require.C = C;
    })(require);
    var exports = m4.exports || (m4.exports = {});
    (function (exports) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        exports.C = C;
    })(exports);
})(m4);
