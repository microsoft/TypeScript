//// [tests/cases/conformance/statements/VariableStatements/invalidMultipleVariableDeclarations.ts] ////

//// [invalidMultipleVariableDeclarations.ts]
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

//// [invalidMultipleVariableDeclarations.js]
class C {
    id;
    valid;
}
class C2 extends C {
    name;
}
class D {
    source;
    recurse;
    wrapped;
}
function F(x) { return 42; }
var M;
(function (M) {
    class A {
        name;
    }
    M.A = A;
    function F2(x) { return x.toString(); }
    M.F2 = F2;
})(M || (M = {}));
// all of these are errors
var a;
var a = 1;
var a = 'a string';
var a = new C();
var a = new D();
var a = M;
var b;
var b = new C();
var b = new C2();
var f = F;
var f = (x) => '';
var arr;
var arr = [1, 2, 3, 4];
var arr = [new C(), new C2(), new D()];
var arr2 = [new D()];
var arr2 = new Array();
var m;
var m = M.A;
