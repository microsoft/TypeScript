//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass7.es6.ts] ////

//// [decoratorOnClass7.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class C {
    static x() { return C.y; }
    static y = 1;
}

let c = new C();

//// [decoratorOnClass7.es6.js]
@dec
export default class C {
    static x() { return C.y; }
    static y = 1;
}
let c = new C();
