// @target: ES6
// @module: System
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