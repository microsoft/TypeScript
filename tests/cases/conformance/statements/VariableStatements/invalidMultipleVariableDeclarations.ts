interface I {
    id: number;
}

class C implements I {
    id: number;
    valid: boolean;
}

class C2 extends C {
    name: string;
}

class D<T>{
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>
}

function F(x: string): number { return 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

// all of these are errors
var a: any;
var a = 1;
var a = 'a string';
var a = new C();
var a = new D<string>();
var a = M;

var b: I;
var b = new C();
var b = new C2();

var f = F;
var f = (x: number) => '';

var arr: string[];
var arr = [1, 2, 3, 4];
var arr = [new C(), new C2(), new D<string>()];

var arr2 = [new D<string>()];
var arr2 = new Array<D<number>>();

var m: typeof M;
var m = M.A;