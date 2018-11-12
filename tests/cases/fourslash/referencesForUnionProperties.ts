/// <reference path='fourslash.ts'/>

////interface One {
////    common: { [|{| "isDefinition": true |}a|]: number; };
////}
////
////interface Base {
////    [|{| "isDefinition": true |}a|]: string;
////    b: string;
////}
////
////interface HasAOrB extends Base {
////    [|{| "isDefinition": true |}a|]: string;
////    b: string;
////}
////
////interface Two {
////    common: HasAOrB;
////}
////
////var x : One | Two;
////
////x.common.[|a|];

const [one, base, hasAOrB, x] = test.ranges();
verify.referenceGroups(one, [
    { definition: "(property) a: number", ranges: [one] },
    { definition: "(property) a: string | number", ranges: [x] },
]);
verify.referenceGroups([base, hasAOrB], [
    { definition: "(property) Base.a: string", ranges: [base] },
    { definition: "(property) HasAOrB.a: string", ranges: [hasAOrB] },
    { definition: "(property) a: string | number", ranges: [x] },
]);
verify.referenceGroups(x, [
    { definition: "(property) a: number", ranges: [one] },
    { definition: "(property) Base.a: string", ranges: [base] },
    { definition: "(property) HasAOrB.a: string", ranges: [hasAOrB] },
    { definition: "(property) a: string | number", ranges: [x] },
]);
