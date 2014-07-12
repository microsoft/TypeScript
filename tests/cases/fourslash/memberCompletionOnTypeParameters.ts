/// <reference path='fourslash.ts'/>

////interface IFoo {
////    x: number;
////    y: string;
////}
////
////function foo<S, T extends IFoo, U extends T, V extends U>() {
////    var s:S, t: T, u: U, v: V;
////    s./*S*/;    // no constraint, no completion
////    t./*T*/;    // IFoo
////    u./*U*/;    // IFoo
////    v./*V*/;    // IFoo
////}

goTo.marker("S");
verify.memberListIsEmpty();

goTo.marker("T");
verify.memberListContains("x", "number");
verify.memberListContains("y", "string");
verify.memberListCount(2);

goTo.marker("U");
verify.memberListContains("x", "number");
verify.memberListContains("y", "string");
verify.memberListCount(2);

goTo.marker("V");
verify.memberListContains("x", "number");
verify.memberListContains("y", "string");
verify.memberListCount(2);



