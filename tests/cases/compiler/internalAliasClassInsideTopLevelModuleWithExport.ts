//@module: commonjs
// @declaration: true
export namespace x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export import xc = x.c;
export var cProp = new xc();
var cReturnVal = cProp.foo(10);