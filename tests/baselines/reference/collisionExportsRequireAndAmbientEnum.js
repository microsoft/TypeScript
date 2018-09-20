//// [tests/cases/compiler/collisionExportsRequireAndAmbientEnum.ts] ////

//// [collisionExportsRequireAndAmbientEnum_externalmodule.ts]
export declare enum require {
    _thisVal1,
    _thisVal2,
}
export declare enum exports {
    _thisVal1,
    _thisVal2,
}
declare module m1 {
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
    export declare enum require { 
        _thisVal1,
        _thisVal2,
    }
    export declare enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//// [collisionExportsRequireAndAmbientEnum_globalFile.ts]
declare enum require {
    _thisVal1,
    _thisVal2,
}
declare enum exports {
    _thisVal1,
    _thisVal2,
}
declare module m3 {
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
    export declare enum require {
        _thisVal1,
        _thisVal2,
    }
    export declare enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//// [collisionExportsRequireAndAmbientEnum_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var m2;
    (function (m2) {
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndAmbientEnum_globalFile.js]
var m4;
(function (m4) {
})(m4 || (m4 = {}));
