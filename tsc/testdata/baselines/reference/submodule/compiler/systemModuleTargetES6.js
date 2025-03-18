//// [tests/cases/compiler/systemModuleTargetES6.ts] ////

//// [systemModuleTargetES6.ts]
export class MyClass { }
export class MyClass2 {
    static value = 42;
    static getInstance() { return MyClass2.value; }
}

export function myFunction() {
    return new MyClass();
}

export function myFunction2() {
    return new MyClass2();
}

//// [systemModuleTargetES6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass2 = exports.MyClass = void 0;
exports.myFunction = myFunction;
exports.myFunction2 = myFunction2;
class MyClass {
}
exports.MyClass = MyClass;
class MyClass2 {
    static value = 42;
    static getInstance() { return MyClass2.value; }
}
exports.MyClass2 = MyClass2;
function myFunction() {
    return new MyClass();
}
function myFunction2() {
    return new MyClass2();
}
