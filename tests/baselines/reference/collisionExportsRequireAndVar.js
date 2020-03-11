//// [tests/cases/compiler/collisionExportsRequireAndVar.ts] ////

//// [collisionExportsRequireAndVar_externalmodule.ts]
export function foo() {
}
var exports = 1;
var require = "require";
module m1 {
    var exports = 0;
    var require = "require";
}
module m2 {
    export var exports = 0;
    export var require = "require";
}

//// [collisionExportsRequireAndVar_globalFile.ts]
var exports = 0;
var require = "require";
module m3 {
    var exports = 0;
    var require = "require";
}
module m4 {
    export var exports = 0;
    export var require = "require";
}

//// [collisionExportsRequireAndVar_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() {
    }
    exports.foo = foo;
    var exports = 1;
    var require = "require";
    var m1;
    (function (m1) {
        var exports = 0;
        var require = "require";
    })(m1 || (m1 = {}));
    var m2;
    (function (m2) {
        m2.exports = 0;
        m2.require = "require";
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndVar_globalFile.js]
var exports = 0;
var require = "require";
var m3;
(function (m3) {
    var exports = 0;
    var require = "require";
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    m4.exports = 0;
    m4.require = "require";
})(m4 || (m4 = {}));
