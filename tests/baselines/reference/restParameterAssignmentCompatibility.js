//// [restParameterAssignmentCompatibility.ts]
class T {
    m(...p3) {

    }
}

class S {
    m(p1, p2) {

    }
}

var t: T;
var s: S;
// M is a non - specialized call or construct signature and S' contains a call or construct signature N where,
//  the number of non-optional parameters in N is less than or equal to the total number of parameters in M,
t = s; // Should be valid (rest params correspond to an infinite expansion of parameters)

class T1 {
    m(p1?, p2?) {

    }
}
var t1: T1;
// When comparing call or construct signatures, parameter names are ignored and rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.
t1 = s; // Similar to above, but optionality does not matter here.

//// [restParameterAssignmentCompatibility.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var T = (function () {
    function T() {
    }
    T.prototype.m = function () {
        var p3 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p3[_i] = arguments[_i];
        }
    };
    __names(T.prototype, ["m"]);
    return T;
}());
var S = (function () {
    function S() {
    }
    S.prototype.m = function (p1, p2) {
    };
    __names(S.prototype, ["m"]);
    return S;
}());
var t;
var s;
// M is a non - specialized call or construct signature and S' contains a call or construct signature N where,
//  the number of non-optional parameters in N is less than or equal to the total number of parameters in M,
t = s; // Should be valid (rest params correspond to an infinite expansion of parameters)
var T1 = (function () {
    function T1() {
    }
    T1.prototype.m = function (p1, p2) {
    };
    __names(T1.prototype, ["m"]);
    return T1;
}());
var t1;
// When comparing call or construct signatures, parameter names are ignored and rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.
t1 = s; // Similar to above, but optionality does not matter here.
