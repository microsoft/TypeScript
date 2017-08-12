//// [es5-commonjs.ts]
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


//// [es5-commonjs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.B = function () {
        return 42;
    };
    return A;
}());
exports.default = A;
