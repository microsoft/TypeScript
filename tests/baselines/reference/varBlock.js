//// [tests/cases/compiler/varBlock.ts] ////

//// [varBlock.ts]
module m2 {

    export var a, b2: number = 10, b;
}

declare module m3 {
    var a, b, c;
    var a1, b1 = 10;

    class C {
        constructor (public c = 10);
    }
}

declare var b = 10;

declare var a2, b2, c2;



declare var da = 10;
declare var d3, d4 = 10;

module m3 {
    declare var d = 10;
    declare var d2, d3 = 10, d4 = 10;
    export declare var dE = 10;
    export declare var d2E, d3E = 10, d4E = 10;
}

declare module m4 {
    var d = 10;
    var d2, d3 = 10, d4 =10;
    export var dE = 10;
    export var d2E, d3E = 10, d4E = 10;
}

declare var c;
declare var c = 10;

//// [varBlock.js]
var m2;
(function (m2) {
    m2.b2 = 10;
})(m2 || (m2 = {}));
var m3;
(function (m3) {
})(m3 || (m3 = {}));
