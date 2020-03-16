// @strict: true
// @target: es6

class A {
    public #foo = 3;         // Error
    private #bar = 3;        // Error
    protected #baz = 3;      // Error
    readonly #qux = 3;       // OK
    declare #what: number;   // Error
}

abstract class B {
    abstract #quux = 3;      // Error
}
