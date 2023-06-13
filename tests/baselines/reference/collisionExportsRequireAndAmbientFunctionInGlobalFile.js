//// [tests/cases/compiler/collisionExportsRequireAndAmbientFunctionInGlobalFile.ts] ////

//// [collisionExportsRequireAndAmbientFunctionInGlobalFile.ts]
declare function exports(): number;
declare function require(): string;
declare module m3 {
    function exports(): string[];
    function require(): number[];
}
module m4 {
    export declare function exports(): string;
    export declare function require(): string;
    var a = 10;
}

//// [collisionExportsRequireAndAmbientFunctionInGlobalFile.js]
var m4;
(function (m4) {
    var a = 10;
})(m4 || (m4 = {}));
