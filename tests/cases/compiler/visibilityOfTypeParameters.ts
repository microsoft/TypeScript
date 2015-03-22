// @module:commonjs
//@declaration: true

export class MyClass {
    protected myMethod<T>(val: T): T {
        return val;
    }
}