/// <reference path='fourslash.ts'/>

////class X{
////	[|[|{| "isDefinition": true, "contextRangeIndex": 0|}foo|]:any|]
////}
////
////class Y extends X{
////	[|static [|{| "isDefinition": true, "contextRangeIndex": 2|}foo|]:any|]
////}
////
////class Z extends Y{
////	[|static [|{| "isDefinition": true, "contextRangeIndex": 4|}foo|]:any|]
////	[|[|{| "isDefinition": true, "contextRangeIndex": 6|}foo|]:any|]
////}
////
////const x = new X();
////const y = new Y();
////const z = new Z();
////x.[|foo|];
////y.[|foo|];
////z.[|foo|];
////Y.[|foo|];
////Z.[|foo|];

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4, r5, r6, r7, r8] = test.ranges();
verify.referenceGroups([r0, r3, r4, r5, r6], [
    { definition: { text: '(property) X.foo: any', range: r0 }, ranges: [r0, r4, r5] },
    { definition: { text: '(property) Z.foo: any', range: r3 }, ranges: [r3, r6] },
]);

verify.referenceGroups([r1, r7], [
    { definition: { text: '(property) Y.foo: any', range: r1 }, ranges: [r1, r7] },
]);

verify.referenceGroups([r2, r8], [
    { definition: { text: '(property) Z.foo: any', range: r2 }, ranges: [r2, r8] },
]);
