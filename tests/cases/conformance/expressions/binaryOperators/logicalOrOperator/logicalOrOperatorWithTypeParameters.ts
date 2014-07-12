function fn1<T, U>(t: T, u: U) {
    var r1 = t || t;
    var r2: T = t || t;
    var r3 = t || u;
    var r4: {} = t || u;
}

function fn2<T, U/* extends T*/, V/* extends T*/>(t: T, u: U, v: V) {
    var r1 = t || u;
    //var r2: T = t || u;
    var r3 = u || u;
    var r4: U = u || u;
    var r5 = u || v;
    var r6: {} = u || v;
    //var r7: T = u || v;
}

function fn3<T extends { a: string; b: string }, U extends { a: string; b: number }>(t: T, u: U) {
    var r1 = t || u;
    var r2: {} = t || u;
    var r3 = t || { a: '' };
    var r4: { a: string } = t || u;
}