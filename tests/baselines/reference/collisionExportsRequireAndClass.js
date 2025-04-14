//// [tests/cases/compiler/collisionExportsRequireAndClass.ts] ////

//// [collisionExportsRequireAndClass_externalmodule.ts]
export class require {
}
export class exports {
}
module m1 {
    class require {
    }
    class exports {
    }
}
module m2 {
    export class require {
    }
    export class exports {
    }
}

//// [collisionExportsRequireAndClass_globalFile.ts]
class require {
}
class exports {
}
module m3 {
    class require {
    }
    class exports {
    }
}
module m4 {
    export class require {
    }
    export class exports {
    }
}

//// [collisionExportsRequireAndClass_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exports = exports.require = void 0;
    var require = /** @class */ (function () {
        function require() {
        }
        return require;
    }());
    exports.require = require;
    var exports = /** @class */ (function () {
        function exports() {
        }
        return exports;
    }());
    exports.exports = exports;
    var m1;
    (function (m1) {
        var require = /** @class */ (function () {
            function require() {
            }
            return require;
        }());
        var exports = /** @class */ (function () {
            function exports() {
            }
            return exports;
        }());
    })(m1 || (m1 = {}));
    var m2;
    (function (m2) {
        var require = /** @class */ (function () {
            function require() {
            }
            return require;
        }());
        m2.require = require;
        var exports = /** @class */ (function () {
            function exports() {
            }
            return exports;
        }());
        m2.exports = exports;
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndClass_globalFile.js]
var require = /** @class */ (function () {
    function require() {
    }
    return require;
}());
var exports = /** @class */ (function () {
    function exports() {
    }
    return exports;
}());
var m3;
(function (m3) {
    var require = /** @class */ (function () {
        function require() {
        }
        return require;
    }());
    var exports = /** @class */ (function () {
        function exports() {
        }
        return exports;
    }());
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    var require = /** @class */ (function () {
        function require() {
        }
        return require;
    }());
    m4.require = require;
    var exports = /** @class */ (function () {
        function exports() {
        }
        return exports;
    }());
    m4.exports = exports;
})(m4 || (m4 = {}));
