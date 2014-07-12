//// [augmentedTypesEnum.js]
// enum then var
var e1111;
(function (e1111) {
    e1111[e1111["One"] = 0] = "One";
})(e1111 || (e1111 = {}));
var e1111 = 1;

// enum then function
var e2;
(function (e2) {
    e2[e2["One"] = 0] = "One";
})(e2 || (e2 = {}));
function e2() {
}

var e3;
(function (e3) {
    e3[e3["One"] = 0] = "One";
})(e3 || (e3 = {}));
var e3 = function () {
};

// enum then class
var e4;
(function (e4) {
    e4[e4["One"] = 0] = "One";
})(e4 || (e4 = {}));
var e4 = (function () {
    function e4() {
    }
    e4.prototype.foo = function () {
    };
    return e4;
})();

// enum then enum
var e5;
(function (e5) {
    e5[e5["One"] = 0] = "One";
})(e5 || (e5 = {}));
var e5;
(function (e5) {
    e5[e5["Two"] = 0] = "Two";
})(e5 || (e5 = {}));

var e5a;
(function (e5a) {
    e5a[e5a["One"] = 0] = "One";
})(e5a || (e5a = {}));
var e5a;
(function (e5a) {
    e5a[e5a["One"] = 0] = "One";
})(e5a || (e5a = {}));

// enum then internal module
var e6;
(function (e6) {
    e6[e6["One"] = 0] = "One";
})(e6 || (e6 = {}));

var e6a;
(function (e6a) {
    e6a[e6a["One"] = 0] = "One";
})(e6a || (e6a = {}));
var e6a;
(function (e6a) {
    var y = 2;
})(e6a || (e6a = {}));

var e6b;
(function (e6b) {
    e6b[e6b["One"] = 0] = "One";
})(e6b || (e6b = {}));
var e6b;
(function (e6b) {
    e6b.y = 2;
})(e6b || (e6b = {}));
// enum then import, messes with error reporting
//enum e7 { One }
//import e7 = require(''); // should be error
