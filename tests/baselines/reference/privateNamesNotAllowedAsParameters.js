//// [privateNamesNotAllowedAsParameters.ts]
class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
var _foo;
class A {
    constructor() {
        _foo.set(this, void 0);
    }
    setFoo() { }
}
_foo = new WeakMap();
{ }
