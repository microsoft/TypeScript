// @strict: true
// @declaration: true

type BrokenType<T> = 'a' | 'b';

class MyClass {
    constructor(readonly arg?: BrokenType<any>) {}
}