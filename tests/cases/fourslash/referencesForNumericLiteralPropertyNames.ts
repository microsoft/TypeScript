/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isDefinition": true |}12|]: any;
////}
////
////var x: Foo;
////x[[|12|]];
////x = { "[|{| "isDefinition": true |}12|]": 0 };
////x = { [|{| "isDefinition": true |}12|]: 0 };

//verify.singleReferenceGroup("(property) Foo[12]: any");
const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "(property) Foo[12]: any", ranges }]);
verify.referenceGroups(r2, [
    { definition: "(property) Foo[12]: any", ranges: [r0, r1, r3] },
    { definition: "(property) \"12\": number", ranges: [r2] }
]);
verify.referenceGroups(r3, [
    { definition: "(property) Foo[12]: any", ranges: [r0, r1, r2] },
    { definition: "(property) 12: number", ranges: [r3] }
]);
