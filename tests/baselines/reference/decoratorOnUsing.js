//// [tests/cases/conformance/decorators/invalid/decoratorOnUsing.ts] ////

//// [decoratorOnUsing.ts]
declare function dec<T>(target: T): T;

@dec
using 1

@dec
using x


//// [decoratorOnUsing.js]
using ;
1;
using x;
