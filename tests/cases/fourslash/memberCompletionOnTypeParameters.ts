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

verify.completions(
    { at: "S", are: undefined },
    { at: ["T", "V"], are: [{ name: "x", text: "(property) IFoo.x: number" }, { name: "y", text: "(property) IFoo.y: string" }]},
    { at: "U", are: ["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable"] },
);
