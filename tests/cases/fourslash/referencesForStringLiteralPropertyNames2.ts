/// <reference path='fourslash.ts'/>

////class Foo {
////    "[|{| "isDefinition": true |}blah|]"() { return 0; }
////}
////
////var x: Foo;
////x.[|blah|];

//verify.singleReferenceGroup('(method) Foo["blah"](): number');
const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: '(method) Foo["blah"](): number', ranges }]);
verify.referenceGroups(r1, [
    { definition: '(method) Foo["blah"](): number', ranges: [r0] },
    { definition: '(method) Foo["blah"](): number', ranges: [r1] }
]);
