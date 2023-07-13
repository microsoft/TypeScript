//// [tests/cases/compiler/es6ModuleVariableStatement.ts] ////

//// [es6ModuleVariableStatement.ts]
export var a = "hello";
export var x: string = a, y = x;
var b = y;
var c: string = b, d = c;
export module m1 {
    export var k = a;
    export var l: string = b, m = k;
    var n = m1.k;
    var o: string = n, p = k;
}
module m2 {
    export var k = a;
    export var l: string = b, m = k;
    var n = m1.k;
    var o: string = n, p = k;
}

//// [es6ModuleVariableStatement.js]
export var a = "hello";
export var x = a, y = x;
var b = y;
var c = b, d = c;
export var m1;
(function (m1) {
    m1.k = a;
    m1.l = b, m1.m = m1.k;
    var n = m1.k;
    var o = n, p = m1.k;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.k = a;
    m2.l = b, m2.m = m2.k;
    var n = m1.k;
    var o = n, p = m2.k;
})(m2 || (m2 = {}));
