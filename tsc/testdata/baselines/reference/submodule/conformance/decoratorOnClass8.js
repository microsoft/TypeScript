//// [tests/cases/conformance/decorators/class/decoratorOnClass8.ts] ////

//// [decoratorOnClass8.ts]
declare function dec(): (target: Function, paramIndex: number) => void;

@dec()
class C {
}

//// [decoratorOnClass8.js]
@dec()
class C {
}
