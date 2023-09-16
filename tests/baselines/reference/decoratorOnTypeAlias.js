//// [tests/cases/conformance/decorators/invalid/decoratorOnTypeAlias.ts] ////

//// [decoratorOnTypeAlias.ts]
declare function dec<T>(target: T): T;

@dec
type T = number;

//// [decoratorOnTypeAlias.js]
