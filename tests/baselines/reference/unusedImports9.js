//// [tests/cases/compiler/unusedImports9.ts] ////

//// [file1.ts]
export class Calculator {
    handleChar() {}
}

export function test() {

}

export function test2() {

}

//// [file2.ts]
import c = require('./file1')

//// [file1.js]
"use strict";
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
exports.__esModule = true;
var Calculator = (function () {
    function Calculator() {
    }
    Calculator.prototype.handleChar = function () { };
    __names(Calculator.prototype, ["handleChar"]);
    return Calculator;
}());
exports.Calculator = Calculator;
function test() {
}
exports.test = test;
function test2() {
}
exports.test2 = test2;
//// [file2.js]
"use strict";
exports.__esModule = true;
