/// <reference path='fourslash.ts'/>

////interface IFoo {
////    x: number;
////    y: string;
////}
////
////function foo<S, T extends IFoo, U extends Object, V extends IFoo>() {
////    var s:S, t: T, u: U, v: V;
////    s./*S*/;    // no constraint, no completion
////    t./*T*/;    // IFoo
////    u./*U*/;    // IFoo
////    v./*V*/;    // IFoo
////}

goTo.marker("S");
verify.completionListIsEmpty();

goTo.marker("T");
verify.completionListContains("x", "(property) IFoo.x: number");
verify.completionListContains("y", "(property) IFoo.y: string");
verify.completionListCount(2);

goTo.marker("U");
verify.completionListContains("toString", "(method) Object.toString(): string");
verify.completionListCount(7); // constructor, toString, toLocaleString, valueOf, hasOwnProperty, isPrototypeOf, propertyIsEnumerable

goTo.marker("V");
verify.completionListContains("x", "(property) IFoo.x: number");
verify.completionListContains("y", "(property) IFoo.y: string");
verify.completionListCount(2);



