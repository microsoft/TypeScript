//// [tests/cases/compiler/circularInstantiationExpression.ts] ////

//// [circularInstantiationExpression.ts]
declare function foo<T>(t: T): typeof foo<T>;
foo("");


//// [circularInstantiationExpression.js]
foo("");


//// [circularInstantiationExpression.d.ts]
declare function foo<T>(t: T): typeof foo<T>;
