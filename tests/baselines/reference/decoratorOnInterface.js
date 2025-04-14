//// [tests/cases/conformance/decorators/invalid/decoratorOnInterface.ts] ////

//// [decoratorOnInterface.ts]
declare function dec<T>(target: T): T;

@dec
interface I {
}

//// [decoratorOnInterface.js]
