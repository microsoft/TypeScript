/// <reference path='fourslash.ts'/>

// @Filename: quickInfoJsDocTags.ts
////type U = A | B;
////
////interface A {
////    /** Kind A */
////    kind: "a";
////    /** Prop A */
////    prop: number;
////}
////
////interface B {
////    /** Kind B */
////    kind: "b";
////    /** Prop B */
////    prop: string;
////}
////
////const u: U = {
////    /*uKind*/kind: "a",
////    /*uProp*/prop: 0,
////}
////const u2: U = {
////    /*u2Kind*/kind: "bogus",
////    /*u2Prop*/prop: 1,
////};

verify.quickInfos({
    uKind: ['(property) A.kind: "a"', "Kind A"],
    uProp: ["(property) A.prop: number", "Prop A"],
    u2Kind: '(property) kind: "bogus"',
    u2Prop: "(property) prop: number",
});
