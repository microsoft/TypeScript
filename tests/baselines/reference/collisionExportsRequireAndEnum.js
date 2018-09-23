//// [tests/cases/compiler/collisionExportsRequireAndEnum.ts] ////

//// [collisionExportsRequireAndEnum_externalmodule.ts]
export enum require { // Error
    _thisVal1,
    _thisVal2,
}
export enum exports { // Error
    _thisVal1,
    _thisVal2,
}
module m1 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
module m2 {
    export enum require { 
        _thisVal1,
        _thisVal2,
    }
    export enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//// [collisionExportsRequireAndEnum_globalFile.ts]
enum require {
    _thisVal1,
    _thisVal2,
}
enum exports {
    _thisVal1,
    _thisVal2,
}
module m3 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
module m4 {
    export enum require {
        _thisVal1,
        _thisVal2,
    }
    export enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//// [collisionExportsRequireAndEnum_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var require = {};
    (function (require) {
        require[require["_thisVal1"] = 0] = "_thisVal1";
        require[require["_thisVal2"] = 1] = "_thisVal2";
    })(require);
    var exports = {};
    (function (exports) {
        exports[exports["_thisVal1"] = 0] = "_thisVal1";
        exports[exports["_thisVal2"] = 1] = "_thisVal2";
    })(exports);
    var m1 = {};
    (function (m1) {
        var require = require || (require = {});
        (function (require) {
            require[require["_thisVal1"] = 0] = "_thisVal1";
            require[require["_thisVal2"] = 1] = "_thisVal2";
        })(require);
        var exports = exports || (exports = {});
        (function (exports) {
            exports[exports["_thisVal1"] = 0] = "_thisVal1";
            exports[exports["_thisVal2"] = 1] = "_thisVal2";
        })(exports);
    })(m1);
    var m2 = {};
    (function (m2) {
        var require = m2.require || (m2.require = {});
        (function (require) {
            require[require["_thisVal1"] = 0] = "_thisVal1";
            require[require["_thisVal2"] = 1] = "_thisVal2";
        })(require);
        var exports = m2.exports || (m2.exports = {});
        (function (exports) {
            exports[exports["_thisVal1"] = 0] = "_thisVal1";
            exports[exports["_thisVal2"] = 1] = "_thisVal2";
        })(exports);
    })(m2);
});
//// [collisionExportsRequireAndEnum_globalFile.js]
var require = require || (require = {});
(function (require) {
    require[require["_thisVal1"] = 0] = "_thisVal1";
    require[require["_thisVal2"] = 1] = "_thisVal2";
})(require);
var exports = exports || (exports = {});
(function (exports) {
    exports[exports["_thisVal1"] = 0] = "_thisVal1";
    exports[exports["_thisVal2"] = 1] = "_thisVal2";
})(exports);
var m3 = m3 || (m3 = {});
(function (m3) {
    var require = require || (require = {});
    (function (require) {
        require[require["_thisVal1"] = 0] = "_thisVal1";
        require[require["_thisVal2"] = 1] = "_thisVal2";
    })(require);
    var exports = exports || (exports = {});
    (function (exports) {
        exports[exports["_thisVal1"] = 0] = "_thisVal1";
        exports[exports["_thisVal2"] = 1] = "_thisVal2";
    })(exports);
})(m3);
var m4 = m4 || (m4 = {});
(function (m4) {
    var require = m4.require || (m4.require = {});
    (function (require) {
        require[require["_thisVal1"] = 0] = "_thisVal1";
        require[require["_thisVal2"] = 1] = "_thisVal2";
    })(require);
    var exports = m4.exports || (m4.exports = {});
    (function (exports) {
        exports[exports["_thisVal1"] = 0] = "_thisVal1";
        exports[exports["_thisVal2"] = 1] = "_thisVal2";
    })(exports);
})(m4);
