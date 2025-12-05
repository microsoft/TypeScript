//@module: commonjs
export namespace x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export namespace m2 {
    export namespace m3 {
        import c = x.c;
        export var cProp = new c();
        var cReturnVal = cProp.foo(10);
    }
}

export var d = new m2.m3.c();