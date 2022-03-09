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
var _A_foo, _A_bar;
class A {
    constructor() {
        _A_foo.set(this, void 0);
        _A_bar.set(this, 6);
        this.qux = 6;
    }
    quux() {
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();


//// [privateNameDeclaration.d.ts]
declare class A {
    #private;
    baz: string;
    qux: number;
    quux(): void;
}
