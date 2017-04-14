/// <reference path='fourslash.ts'/>

////class Foo {
////    public "[|{| "isDefinition": true |}ss|]": any;
////}
////
////var x: Foo;
////x.[|ss|];
////x["[|ss|]"];
////x = { "[|{| "isDefinition": true |}ss|]": 0 };
////x = { [|{| "isWriteAccess": true, "isDefinition": true |}ss|]: 0 };

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.referenceGroups([r0, r1, r2], [{ definition: '(property) Foo["ss"]: any', ranges }]);
verify.referenceGroups(r3, [
    { definition: '(property) Foo["ss"]: any', ranges: [r0, r1, r2, r4] },
    { definition: '(property) "ss": number', ranges: [r3] }
]);
verify.referenceGroups(r4, [
    { definition: '(property) Foo["ss"]: any', ranges: [r0, r1, r2, r3] },
    { definition: '(property) ss: number', ranges: [r4] }
]);
