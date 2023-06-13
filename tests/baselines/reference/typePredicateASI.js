//// [tests/cases/conformance/expressions/typeGuards/typePredicateASI.ts] ////

//// [typePredicateASI.ts]
interface I {
    foo(callback: (a: any, b: any) => void): I
    is(): boolean;
}

//// [typePredicateASI.js]
