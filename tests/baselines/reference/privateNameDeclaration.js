//// [privateNameDeclaration.ts]
class A {
    #foo: string;
    #bar = 6;
    baz: string;
    qux = 6;
    quux(): void {

    }
}


//// [privateNameDeclaration.js]
var _foo, _bar;
class A {
    constructor() {
        _foo.set(this, void 0);
        _bar.set(this, 6);
        this.qux = 6;
    }
    quux() {
    }
}
_foo = new WeakMap(), _bar = new WeakMap();


//// [privateNameDeclaration.d.ts]
declare class A {
    #private;
    baz: string;
    qux: number;
    quux(): void;
}
