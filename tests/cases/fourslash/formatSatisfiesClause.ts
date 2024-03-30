/// <reference path="fourslash.ts" />

////type T1 = {
////    p: string;
////}
////
////function f1() { } satisfies () => {}
////function f2() { }satisfies () => {}
////function f3() { }   satisfies () => {}
////
////class C1 { } satisfies T1
////class C2 { }satisfies T1
////class C3 { }   satisfies T1

format.document();
verify.currentFileContentIs(
`type T1 = {
    p: string;
}

function f1() { } satisfies () => {}
function f2() { } satisfies () => {}
function f3() { } satisfies () => {}

class C1 { } satisfies T1
class C2 { } satisfies T1
class C3 { } satisfies T1`
);
