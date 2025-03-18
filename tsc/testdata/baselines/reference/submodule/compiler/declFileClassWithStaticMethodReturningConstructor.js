//// [tests/cases/compiler/declFileClassWithStaticMethodReturningConstructor.ts] ////

//// [declFileClassWithStaticMethodReturningConstructor.ts]
export class Enhancement {
    public static getType() {
        return this;
    }
}

//// [declFileClassWithStaticMethodReturningConstructor.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enhancement = void 0;
class Enhancement {
    static getType() {
        return this;
    }
}
exports.Enhancement = Enhancement;
