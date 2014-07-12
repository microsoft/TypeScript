//// [collisionCodeGenModuleWithModuleReopening.ts]
module m1 {
    export class m1 {
    }
}
var foo = new m1.m1();
module m1 {
    export class c1 {
    }
    var b = new c1();
    var c = new m1();
}
var foo2 = new m1.c1();

module m2 {
    export class c1 {
    }
    export var b10 = 10;
    var x = new c1();
}
var foo3 = new m2.c1();
module m2 {
    export class m2 {
    }
    var b = new m2();
    var d = b10;
    var c = new c1();
}
var foo3 = new m2.c1();
var foo2 = new m2.m2();

//// [collisionCodeGenModuleWithModuleReopening.js]
var m1;
(function (_m1) {
    var m1 = (function () {
        function m1() {
        }
        return m1;
    })();
    _m1.m1 = m1;
})(m1 || (m1 = {}));
var foo = new m1.m1();
var m1;
(function (m1) {
    var c1 = (function () {
        function c1() {
        }
        return c1;
    })();
    m1.c1 = c1;
    var b = new c1();
    var c = new m1.m1();
})(m1 || (m1 = {}));
var foo2 = new m1.c1();

var m2;
(function (m2) {
    var c1 = (function () {
        function c1() {
        }
        return c1;
    })();
    m2.c1 = c1;
    m2.b10 = 10;
    var x = new c1();
})(m2 || (m2 = {}));
var foo3 = new m2.c1();
var m2;
(function (_m2) {
    var m2 = (function () {
        function m2() {
        }
        return m2;
    })();
    _m2.m2 = m2;
    var b = new m2();
    var d = _m2.b10;
    var c = new _m2.c1();
})(m2 || (m2 = {}));
var foo3 = new m2.c1();
var foo2 = new m2.m2();
