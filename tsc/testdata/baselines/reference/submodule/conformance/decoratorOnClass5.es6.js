//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass5.es6.ts] ////

//// [decoratorOnClass5.es6.ts]
declare function dec<T>(target: T): T;

@dec
class C {
    static x() { return C.y; }
    static y = 1;
}

let c = new C();

//// [decoratorOnClass5.es6.js]
@dec
class C {
    static x() { return C.y; }
    static y = 1;
}
let c = new C();
