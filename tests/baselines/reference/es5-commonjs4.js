//// [es5-commonjs4.ts]
export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}
export var __esModule = 1;


//// [es5-commonjs4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__esModule = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
}());
exports.default = A;
exports.__esModule = 1;
