//// [tests/cases/compiler/nonNullMappedType.ts] ////

//// [nonNullMappedType.ts]
function f<A extends string>(p0: { [key in A]: {} | undefined }, p1: A) {
    const v: {} = p0[p1]!;
}

//// [nonNullMappedType.js]
function f(p0, p1) {
    const v = p0[p1];
}
