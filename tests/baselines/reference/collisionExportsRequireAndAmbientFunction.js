//// [tests/cases/compiler/collisionExportsRequireAndAmbientFunction.ts] ////

//// [collisionExportsRequireAndAmbientFunction.ts]
export declare function exports(): number;

export declare function require(): string[];
    
declare namespace m1 {
    function exports(): string;
    function require(): number;
}
namespace m2 {
    export declare function exports(): string;
    export declare function require(): string[];
    var a = 10;
}

//// [collisionExportsRequireAndAmbientFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m2;
(function (m2) {
    var a = 10;
})(m2 || (m2 = {}));
