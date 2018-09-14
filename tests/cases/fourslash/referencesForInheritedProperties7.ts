/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isDefinition": true |}propName|]: string;
//// }
//// interface interface1 extends interface1 {
////    [|{| "isDefinition": true |}doStuff|](): void;
////    [|{| "isDefinition": true |}propName|]: string;
//// }
//// class class2 extends class1 implements interface1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isDefinition": true |}propName|]: string;
//// }
////
//// var v: class2;
//// v.[|doStuff|]();
//// v.[|propName|];

const [r0, r1, r2, r3, r4, r5, r6, r7] = test.ranges();
const c1DoStuff = { definition: "(method) class1.doStuff(): void", ranges: [r0] };
const c2DoStuff = { definition: "(method) class2.doStuff(): void", ranges: [r4, r6] };
const c1PropName = { definition: "(property) class1.propName: string", ranges: [r1] };
const c2PropName = { definition: "(property) class2.propName: string", ranges: [r5, r7] };
const iDoStuff = { definition: "(method) interface1.doStuff(): void", ranges: [r2] };
const iPropName = { definition: "(property) interface1.propName: string", ranges: [r3] };
verify.referenceGroups(r0, [c1DoStuff, c2DoStuff]);
verify.referenceGroups(r1, [c1PropName, c2PropName]);
verify.referenceGroups(r2, [iDoStuff, c2DoStuff]);
verify.referenceGroups(r3, [iPropName, c2PropName]);
verify.referenceGroups([r4, r6], [c1DoStuff, iDoStuff, c2DoStuff]);
verify.referenceGroups([r5, r7], [c1PropName, iPropName, c2PropName]);
