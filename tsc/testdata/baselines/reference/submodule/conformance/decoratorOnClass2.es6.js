//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass2.es6.ts] ////

//// [decoratorOnClass2.es6.ts]
declare function dec<T>(target: T): T;

@dec
export class C {
}

let c = new C();

//// [decoratorOnClass2.es6.js]
@dec
export class C {
}
let c = new C();
