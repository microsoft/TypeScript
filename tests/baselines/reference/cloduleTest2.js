//// [cloduleTest2.js]
var T1;
(function (T1) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));

    var r = new m3d();
})(T1 || (T1 = {}));

var T2;
(function (T2) {
    var m3d;
    (function (m3d) {
        m3d.y = 2;
    })(m3d || (m3d = {}));
    var r = new m3d();
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

var r = new m3d();

var r2 = new m4d(); // error
