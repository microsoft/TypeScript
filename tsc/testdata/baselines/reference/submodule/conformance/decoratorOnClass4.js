//// [tests/cases/conformance/decorators/class/decoratorOnClass4.ts] ////

//// [decoratorOnClass4.ts]
declare function dec(): <T>(target: T) => T;

@dec()
class C {
}

//// [decoratorOnClass4.js]
@dec()
class C {
}
