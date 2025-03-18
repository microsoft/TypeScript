//// [tests/cases/conformance/types/typeAliases/intrinsicKeyword.ts] ////

//// [intrinsicKeyword.ts]
let e1: intrinsic;
let e2: { intrinsic: intrinsic };
type TE1 = (intrinsic);
type TE2<intrinsic> = intrinsic;
type TE3<T extends intrinsic> = T;
type TE4<intrinsic extends intrinsic> = intrinsic;
type TE5<intrinsic extends intrinsic> = (intrinsic);

function f1() {
    let intrinsic: intrinsic.intrinsic;
}

function f2(intrinsic: string) {
    return intrinsic;
}

function f3() {
    type intrinsic = string;
    let s1: intrinsic = 'ok';
}


//// [intrinsicKeyword.js]
let e1;
let e2;
function f1() {
    let intrinsic;
}
function f2(intrinsic) {
    return intrinsic;
}
function f3() {
    let s1 = 'ok';
}
