//// [tests/cases/compiler/visibilityOfTypeParameters.ts] ////

//// [visibilityOfTypeParameters.ts]
export class MyClass {
    protected myMethod<T>(val: T): T {
        return val;
    }
}

//// [visibilityOfTypeParameters.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (val) {
        return val;
    };
    return MyClass;
}());
exports.MyClass = MyClass;


//// [visibilityOfTypeParameters.d.ts]
export declare class MyClass {
    protected myMethod<T>(val: T): T;
}
