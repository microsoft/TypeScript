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
class MyClass {
    myMethod(val) {
        return val;
    }
}
exports.MyClass = MyClass;
