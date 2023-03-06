// @noImplicitAny: true, false

declare class C {
    get foo(): typeof this.foo;
}
