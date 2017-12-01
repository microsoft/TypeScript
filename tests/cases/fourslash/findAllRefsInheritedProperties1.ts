/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
////
//// var v: class1;
//// v.[|doStuff|]();
//// v.[|propName|];

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups(r0, [{ definition: "(method) class1.doStuff(): void", ranges: [r0, r2] }]);
verify.referenceGroups(r2, [
    { definition: "(method) class1.doStuff(): void", ranges: [r0] },
    { definition: "(method) class1.doStuff(): void", ranges: [r2] }
]);
verify.singleReferenceGroup("(property) class1.propName: string", [r1, r3]);
