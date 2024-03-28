//// [tests/cases/compiler/collisionExportsRequireAndAmbientFunction.ts] ////

//// [collisionExportsRequireAndAmbientFunction.ts]
export declare function exports(): number;

export declare function require(): string[];
    
declare module m1 {
    function exports(): string;
    function require(): number;
}
module m2 {
    export declare function exports(): string;
    export declare function require(): string[];
    var a = 10;
}

//// [collisionExportsRequireAndAmbientFunction.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m2;
    (function (m2) {
        var a = 10;
    })(m2 || (m2 = {}));
});
