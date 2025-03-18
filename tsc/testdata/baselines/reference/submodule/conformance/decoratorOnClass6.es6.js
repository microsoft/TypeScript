//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass6.es6.ts] ////

//// [decoratorOnClass6.es6.ts]
declare function dec<T>(target: T): T;

@dec
export class C {
    static x() { return C.y; }
    static y = 1;
}

let c = new C();

//// [decoratorOnClass6.es6.js]
@dec
export class C {
    static x() { return C.y; }
    static y = 1;
}
let c = new C();
