//// [tests/cases/conformance/functions/functionOverloadErrors.ts] ////

//// [functionOverloadErrors.ts]
//Function overload signature with initializer
function fn1(x = 3);
function fn1() { }

//Multiple function overload signatures that are identical
function fn2a();
function fn2a();
function fn2a() {

}
function fn2b(n: number[]);
function fn2b(n: Array<number>);
function fn2b() {
}

//Multiple function overload signatures that differ only by return type
function fn3(x: string): string;
function fn3(y: string): number;
function fn3(): any {
    return null;
}

//Function overload with rest param and another with only an optional parameter
function fn6(...t: any[]);
function fn6(x?: any);
function fn6() { }

//Function overload with rest param and another with only optional parameters
function fn7(...t: any[]);
function fn7(x?: any, y?: any, z?: any);
function fn7() { }

//Function overloads that differ only by type parameter name
function fn8<T>(n: string);
function fn8<S>(n: string);
function fn8() { }

//Function overloads that differ only by type parameter name when used in parameter type annotations
function fn9<T>(n: T);
function fn9<S>(n: S);
function fn9() { }

//Function overloads that differ only by type parameter constraints
function fn10<T extends Window>();
function fn10<S extends Date>();
function fn10() { }
// (actually OK)

//Function overloads that differ only by type parameter constraints where constraints are structually identical
function fn11<T extends Window>();
function fn11<S extends typeof window>();
function fn11() { }

//Function overloads that differ only by type parameter constraints where constraints include infinitely recursive type reference
interface List<T> {
    parents: List<List<T>>;
}
function fn12<T extends List<List<any>>>();
function fn12<T extends List<any>>();
function fn12() { }

//Function overloads that differ by accessibility
class cls {
    public f();
    private f(s: string);
    f() { }

    private g(s: string);
    public g();
    g() { }
}

//Function overloads with differing export
module M {
    export function fn1();
    function fn1(n: string);
    function fn1() { } 

    function fn2(n: string);
    export function fn2();
    export function fn2() { } 
}

//Function overloads with differing ambience
declare function dfn1();
function dfn1(s: string);
function dfn1() { }

function dfn2();
declare function dfn2(s: string);
function dfn2() { }

//Function overloads with fewer params than implementation signature
function fewerParams();
function fewerParams(n: string) {
}

//Function implementation whose parameter types are not assignable to all corresponding overload signature parameters
function fn13(n: string);
function fn13(n: number) { }

//Function overloads where return types are not all subtype of implementation return type
function fn14(n: string): string;
function fn14() {
    return 3;
}

//Function overloads where return types are different infinitely recursive type reference
function fn15<T extends List<List<any>>>(): T;
function fn15<T extends List<any>>(): T;
function fn15() {
    return undefined;
}

//Function overloads which use initializer expressions
function initExpr(n = 13);
function initExpr() { }


//// [functionOverloadErrors.js]
function fn1() { }
function fn2a() {
}
function fn2b() {
}
function fn3() {
    return null;
}
function fn6() { }
function fn7() { }
function fn8() { }
function fn9() { }
function fn10() { }
function fn11() { }
function fn12() { }
//Function overloads that differ by accessibility
var cls = /** @class */ (function () {
    function cls() {
    }
    cls.prototype.f = function () { };
    cls.prototype.g = function () { };
    return cls;
}());
//Function overloads with differing export
var M;
(function (M) {
    function fn1() { }
    function fn2() { }
    M.fn2 = fn2;
})(M || (M = {}));
function dfn1() { }
function dfn2() { }
function fewerParams(n) {
}
function fn13(n) { }
function fn14() {
    return 3;
}
function fn15() {
    return undefined;
}
function initExpr() { }
