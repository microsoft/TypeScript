//// [tests/cases/conformance/controlFlow/controlFlowInstanceofExtendsFunction.ts] ////

//// [controlFlowInstanceofExtendsFunction.ts]
declare global {
    interface Function {
        now(): string;
    }
}

Function.prototype.now = function () {
    return "now"
}

class X {
    static now() {
        return {}
    }

    why() {

    }
}

class Y {

}

console.log(X.now()) // works as expected
console.log(Y.now()) // works as expected

export const x: X | number = Math.random() > 0.5 ? new X() : 1

if (x instanceof X) {
    x.why() // should compile
}

//// [controlFlowInstanceofExtendsFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
Function.prototype.now = function () {
    return "now";
};
var X = /** @class */ (function () {
    function X() {
    }
    X.now = function () {
        return {};
    };
    X.prototype.why = function () {
    };
    return X;
}());
var Y = /** @class */ (function () {
    function Y() {
    }
    return Y;
}());
console.log(X.now()); // works as expected
console.log(Y.now()); // works as expected
exports.x = Math.random() > 0.5 ? new X() : 1;
if (exports.x instanceof X) {
    exports.x.why(); // should compile
}
