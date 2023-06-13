/// <reference path='fourslash.ts'/>

////type U = A | B;
////
////interface A {
////  /*aKind*/kind: "a";
////  /*aProp*/prop: number;
////};
////
////interface B {
////  /*bKind*/kind: "b";
////  /*bProp*/prop: string;
////}
////
////const u: U = {
////  [|/*kind*/kind|]: "a",
////  [|/*prop*/prop|]: 0,
////};
////const u2: U = {
////  [|/*kindBogus*/kind|]: "bogus",
////  [|/*propBogus*/prop|]: 0,
////};

verify.baselineGoToDefinition(
    "kind",
    "prop",
    "kindBogus",
    "propBogus",
);
