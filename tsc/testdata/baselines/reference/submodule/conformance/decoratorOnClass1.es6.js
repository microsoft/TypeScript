//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass1.es6.ts] ////

//// [decoratorOnClass1.es6.ts]
declare function dec<T>(target: T): T;

@dec
class C {
}

let c = new C();

//// [decoratorOnClass1.es6.js]
@dec
class C {
}
let c = new C();
