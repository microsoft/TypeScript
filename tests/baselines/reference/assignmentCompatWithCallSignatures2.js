//// [assignmentCompatWithCallSignatures2.js]
// void returning call signatures can be assigned a non-void returning call signature that otherwise matches
var t;
var a;

t = a;
a = t;

var s;
var a2;
t = s;
t = a2;
a = s;
a = a2;

t = { f: function () {
        return 1;
    } };
t = { f: function (x) {
        return 1;
    } };
t = { f: function f() {
        return 1;
    } };
t = { f: function (x) {
        return '';
    } };
a = { f: function () {
        return 1;
    } };
a = { f: function (x) {
        return 1;
    } };
a = { f: function (x) {
        return '';
    } };

// errors
t = function () {
    return 1;
};
t = function (x) {
    return '';
};
a = function () {
    return 1;
};
a = function (x) {
    return '';
};

var s2;
var a3;

// these are errors
t = s2;
t = a3;
t = function (x) {
    return 1;
};
t = function (x) {
    return '';
};
a = s2;
a = a3;
a = function (x) {
    return 1;
};
a = function (x) {
    return '';
};
