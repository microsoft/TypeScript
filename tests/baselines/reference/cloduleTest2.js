//// [cloduleTest2.ts]
module T1 {
    module m3d { export var y = 2; }
    declare class m3d { constructor(foo); foo(): void ; static bar(); }
    var r = new m3d(); // error
}

module T2 {
    declare class m3d { constructor(foo); foo(): void; static bar(); }
    module m3d { export var y = 2; }
    var r = new m3d(); // error
}

module T3 {
    module m3d { export var y = 2; }
    declare class m3d { foo(): void; static bar(); }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

module T4 {
    declare class m3d { foo(): void; static bar(); }
    module m3d { export var y = 2; }
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
}

module m3d { export var y = 2; }
declare class m3d { constructor(foo); foo(): void; static bar(); }
var r = new m3d(); // error

declare class m4d extends m3d { }
var r2 = new m4d(); // error

//// [cloduleTest2.js]
var T1;
(function (T1) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));
    var r = new m3d(); // error
})(T1 || (T1 = {}));
var T2;
(function (T2) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));
    var r = new m3d(); // error
})(T2 || (T2 = {}));
var T3;
(function (T3) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
})(T3 || (T3 = {}));
var T4;
(function (T4) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));
    var r = new m3d();
    r.foo();
    r.bar(); // error
    r.y; // error
})(T4 || (T4 = {}));
var m3d;
(function (m3d) {
    m3d.y = 2;
})(m3d || (m3d = {}));
var r = new m3d(); // error
var r2 = new m4d(); // error
