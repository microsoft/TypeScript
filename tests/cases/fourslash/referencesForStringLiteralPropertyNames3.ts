/// <reference path='fourslash.ts'/>

////class Foo2 {
////    get "[|{| "isDefinition": true |}42|]"() { return 0; }
////    set [|{| "isDefinition": true |}42|](n) { }
////}
////
////var y: Foo2;
////y[[|42|]];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: '(property) Foo2["42"]: number', ranges }]);
verify.referenceGroups(r2, [
    { definition: '(property) Foo2["42"]: number', ranges: [r0, r1] },
    { definition: '(property) Foo2["42"]: number', ranges: [r2] },
]);
