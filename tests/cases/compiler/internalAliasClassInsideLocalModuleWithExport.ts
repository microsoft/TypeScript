//@module: commonjs
// @declaration: true
export module x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export module m2 {
    export module m3 {
        export import c = x.c;
        export var cProp = new c();
        var cReturnVal = cProp.foo(10);
    }
}

export var d = new m2.m3.c();