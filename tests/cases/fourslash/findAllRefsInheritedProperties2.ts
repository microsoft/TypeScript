/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|{| "isDefinition": true |}doStuff|](): void;   // r0
////    [|{| "isDefinition": true |}propName|]: string;  // r1
//// }
////
//// var v: interface1;
//// v.[|doStuff|]();  // r2
//// v.[|propName|];   // r3

const [r0, r1, r2, r3] = test.ranges();
verify.singleReferenceGroup("(method) interface1.doStuff(): void", [r0, r2]);
verify.singleReferenceGroup("(property) interface1.propName: string", [r1, r3]);
