// @target: es5,esnext
// @lib: esnext
// @noTypesAndSymbols: true
declare var a: any;

function *t1() {
    yield (
        // comment
        a as any
    );
}
function *t2() {
    yield (
        // comment
        a as any
    ) + 1;
}
function *t3() {
    yield (
        // comment
        a as any
    ) ? 0 : 1;
}
function *t4() {
    yield (
        // comment
        a as any
    ).b;
}
function *t5() {
    yield (
        // comment
        a as any
    )[a];
}
function *t6() {
    yield (
        // comment
        a as any
    )();
}
function *t7() {
    yield (
        // comment
        a as any
    )``;
}
function *t8() {
    yield (
        // comment
        a as any
    ) as any;
}
function *t9() {
    yield (
        // comment
        a as any
    ) satisfies any;
}
function *t10() {
    yield (
        // comment
        a as any
    )!;
}
