//// [emitClassDeclarationWithMethodOverloadInES6.ts]
class D {
    _bar: string;
    foo(a: any);
    foo() { }

    baz(...args): string;
    baz(z:string, v: number): string {
        return this._bar;
    } 
}

//// [emitClassDeclarationWithMethodOverloadInES6.js]
class D {
    constructor() {
    }
    foo() {
    }
    baz(z, v) {
        return this._bar;
    }
}
