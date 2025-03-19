//// [tests/cases/conformance/types/conditional/conditionalTypesExcessProperties.ts] ////

//// [conditionalTypesExcessProperties.ts]
type Something<T> = { test: string } &  (T extends object ? {
    arg: T
} : {
    arg?: undefined
    });

function testFunc2<A extends object>(a: A, sa: Something<A>) {
    sa = { test: 'hi', arg: a }; // not excess (but currently still not assignable)
    sa = { test: 'bye', arg: a, arr: a } // excess
}


//// [conditionalTypesExcessProperties.js]
function testFunc2(a, sa) {
    sa = { test: 'hi', arg: a }; // not excess (but currently still not assignable)
    sa = { test: 'bye', arg: a, arr: a }; // excess
}
