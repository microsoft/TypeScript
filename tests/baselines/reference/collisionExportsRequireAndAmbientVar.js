//// [tests/cases/compiler/collisionExportsRequireAndAmbientVar.ts] ////

//// [collisionExportsRequireAndAmbientVar_externalmodule.ts]
export declare var exports: number;
export declare var require: string;
declare module m1 {
    var exports: string;
    var require: number;
}
module m2 {
    export declare var exports: number;
    export declare var require: string;
    var a = 10;
}

//// [collisionExportsRequireAndAmbientVar_globalFile.ts]
declare var exports: number;
declare var require: string;
declare module m3 {
    var exports: string;
    var require: number;
}
module m4 {
    export declare var exports: string;
    export declare var require: number;
    var a = 10;
}

//// [collisionExportsRequireAndAmbientVar_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m2;
    (function (m2) {
        var a = 10;
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndAmbientVar_globalFile.js]
var m4;
(function (m4) {
    var a = 10;
})(m4 || (m4 = {}));
