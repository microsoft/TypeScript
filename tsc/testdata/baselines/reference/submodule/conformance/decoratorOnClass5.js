//// [tests/cases/conformance/decorators/class/decoratorOnClass5.ts] ////

//// [decoratorOnClass5.ts]
declare function dec(): <T>(target: T) => T;

@dec()
class C {
}

//// [decoratorOnClass5.js]
@dec()
class C {
}
