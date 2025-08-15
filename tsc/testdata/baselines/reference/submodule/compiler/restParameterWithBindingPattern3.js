//// [tests/cases/compiler/restParameterWithBindingPattern3.ts] ////

//// [restParameterWithBindingPattern3.ts]
function a(...[a = 1, b = true]: string[]) { }

function b(...[...foo = []]: string[]) { }

function c(...{0: a, length, 3: d}: [boolean, string, number]) { }

function d(...[a, , , d]: [boolean, string, number]) { }

function e(...{0: a = 1, 1: b = true, ...rest: rest}: [boolean, string, number]) { }

//// [restParameterWithBindingPattern3.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function a(...[a = 1, b = true]) { }
function b(...[...foo = []]) { }
function c(...{ 0: a, length, 3: d }) { }
function d(...[a, , , d]) { }
function e(..._a) { var { 0: a = 1, 1: b = true } = _a, rest = __rest(_a, ["0", "1"]); }
