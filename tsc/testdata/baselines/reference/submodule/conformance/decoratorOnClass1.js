//// [tests/cases/conformance/decorators/class/decoratorOnClass1.ts] ////

//// [decoratorOnClass1.ts]
declare function dec<T>(target: T): T;

@dec
class C {
}

//// [decoratorOnClass1.js]
@dec
class C {
}
