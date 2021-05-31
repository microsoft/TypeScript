//// [thisInClassBodyStaticESNext.ts]
// all are allowed with es-compliant class field emit
class Foo {
    x = this
    static t = this
    static at = () => this
    static ft = function () { return this }
    static mt() { return this }
}


//// [thisInClassBodyStaticESNext.js]
// all are allowed with es-compliant class field emit
class Foo {
    x = this;
    static t = this;
    static at = () => this;
    static ft = function () { return this; };
    static mt() { return this; }
}
