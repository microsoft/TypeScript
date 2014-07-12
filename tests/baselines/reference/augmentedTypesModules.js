//// [augmentedTypesModules.js]
var m1 = 1;

var m1a;
(function (m1a) {
    var y = 2;
})(m1a || (m1a = {}));
var m1a = 1;

var m1b;
(function (m1b) {
    m1b.y = 2;
})(m1b || (m1b = {}));
var m1b = 1;

var m1c = 1;

var m1d;
(function (m1d) {
    var I = (function () {
        function I() {
        }
        I.prototype.foo = function () {
        };
        return I;
    })();
    m1d.I = I;
})(m1d || (m1d = {}));
var m1d = 1;

function m2() {
}
;

var m2a;
(function (m2a) {
    var y = 2;
})(m2a || (m2a = {}));
function m2a() {
}
;

var m2b;
(function (m2b) {
    m2b.y = 2;
})(m2b || (m2b = {}));
function m2b() {
}
;

// should be errors to have function first
function m2c() {
}
;
var m2c;
(function (m2c) {
    m2c.y = 2;
})(m2c || (m2c = {}));

function m2f() {
}
;

function m2g() {
}
;
var m2g;
(function (m2g) {
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function () {
        };
        return C;
    })();
    m2g.C = C;
})(m2g || (m2g = {}));

var m3 = (function () {
    function m3() {
    }
    return m3;
})();

var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
var m3a = (function () {
    function m3a() {
    }
    m3a.prototype.foo = function () {
    };
    return m3a;
})();

var m3b = (function () {
    function m3b() {
    }
    m3b.prototype.foo = function () {
    };
    return m3b;
})();
var m3b;
(function (m3b) {
    var y = 2;
})(m3b || (m3b = {}));

var m3c = (function () {
    function m3c() {
    }
    m3c.prototype.foo = function () {
    };
    return m3c;
})();
var m3c;
(function (m3c) {
    m3c.y = 2;
})(m3c || (m3c = {}));

var m3d;
(function (m3d) {
    m3d.y = 2;
})(m3d || (m3d = {}));

var m3e;
(function (m3e) {
    m3e.y = 2;
})(m3e || (m3e = {}));

var m3g;
(function (m3g) {
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function () {
        };
        return C;
    })();
    m3g.C = C;
})(m3g || (m3g = {}));

var m4;
(function (m4) {
})(m4 || (m4 = {}));

var m4a;
(function (m4a) {
    var y = 2;
})(m4a || (m4a = {}));
var m4a;
(function (m4a) {
    m4a[m4a["One"] = 0] = "One";
})(m4a || (m4a = {}));

var m4b;
(function (m4b) {
    m4b.y = 2;
})(m4b || (m4b = {}));
var m4b;
(function (m4b) {
    m4b[m4b["One"] = 0] = "One";
})(m4b || (m4b = {}));

var m4c;
(function (m4c) {
    m4c[m4c["One"] = 0] = "One";
})(m4c || (m4c = {}));

var m4d;
(function (m4d) {
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function () {
        };
        return C;
    })();
})(m4d || (m4d = {}));
var m4d;
(function (m4d) {
    m4d[m4d["One"] = 0] = "One";
})(m4d || (m4d = {}));

//// module then module
var m5;
(function (m5) {
    m5.y = 2;
})(m5 || (m5 = {}));

// module then import
var m6;
(function (m6) {
    m6.y = 2;
})(m6 || (m6 = {}));
//import m6 = require('');
