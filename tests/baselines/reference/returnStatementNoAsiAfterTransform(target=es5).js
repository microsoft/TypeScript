//// [tests/cases/conformance/statements/returnStatements/returnStatementNoAsiAfterTransform.ts] ////

//// [returnStatementNoAsiAfterTransform.ts]
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


//// [returnStatementNoAsiAfterTransform.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function t1() {
    return (
    // comment
    a);
}
function t2() {
    return (
    // comment
    a) + 1;
}
function t3() {
    return (
    // comment
    a) ? 0 : 1;
}
function t4() {
    return (
    // comment
    a).b;
}
function t5() {
    return (
    // comment
    a)[a];
}
function t6() {
    return (
    // comment
    a)();
}
function t7() {
    return (
    // comment
    a)(__makeTemplateObject([""], [""]));
}
function t8() {
    return (
    // comment
    a);
}
function t9() {
    return (
    // comment
    a);
}
function t10() {
    return (
    // comment
    a);
}
