// @target: es5,esnext
// @noTypesAndSymbols: true
declare var a: any;

function t1() {
    return (
        // comment
        a as any
    );
}
function t2() {
    return (
        // comment
        a as any
    ) + 1;
}
function t3() {
    return (
        // comment
        a as any
    ) ? 0 : 1;
}
function t4() {
    return (
        // comment
        a as any
    ).b;
}
function t5() {
    return (
        // comment
        a as any
    )[a];
}
function t6() {
    return (
        // comment
        a as any
    )();
}
function t7() {
    return (
        // comment
        a as any
    )``;
}
function t8() {
    return (
        // comment
        a as any
    ) as any;
}
function t9() {
    return (
        // comment
        a as any
    ) satisfies any;
}
function t10() {
    return (
        // comment
        a as any
    )!;
}
