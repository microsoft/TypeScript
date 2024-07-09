// @strict: true
function f<A extends string>(p0: { [key in A]: {} | undefined }, p1: A) {
    const v: {} = p0[p1]!;
}