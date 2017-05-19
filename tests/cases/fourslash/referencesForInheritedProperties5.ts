/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|](): void;
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
//// interface interface2 extends interface1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|](): void;
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
////
//// var v: interface1;
//// v.[|propName|];
//// v.[|doStuff|]();

const ranges = test.rangesByText();
const [m0, m1, m2] = ranges.get("doStuff");
const [p0, p1, p2] = ranges.get("propName");
verify.referenceGroups([m0, m2], [{ definition: "(method) interface1.doStuff(): void", ranges: [m0, m1, m2] }]);
verify.referenceGroups(m1, [
    { definition: "(method) interface1.doStuff(): void", ranges: [m0, m2] },
    { definition: "(method) interface2.doStuff(): void", ranges: [m1] }
]);
verify.referenceGroups([p0, p2], [{ definition: "(property) interface1.propName: string", ranges: [p0, p1, p2] }]);
verify.referenceGroups(p1, [
    { definition: "(property) interface1.propName: string", ranges: [p0, p2] },
    { definition: "(property) interface2.propName: string", ranges: [p1] }
]);
