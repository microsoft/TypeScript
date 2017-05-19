/// <reference path='fourslash.ts'/>

////interface One {
////    common: { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: number; };
////}
////
////interface Base {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: string;
////    b: string;
////}
////
////interface HasAOrB extends Base {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: string;
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
verify.referenceGroups(one, [{ definition: "(property) a: number", ranges: [one, x] }]);
verify.referenceGroups(base, [{ definition: "(property) Base.a: string", ranges: [base, hasAOrB, x] }]);
verify.referenceGroups(hasAOrB, [
    { definition: "(property) Base.a: string", ranges: [base] },
    { definition: "(property) HasAOrB.a: string", ranges: [hasAOrB, x] }
]);
verify.referenceGroups(x, [
    { definition: "(property) a: number", ranges: [one] },
    { definition: "(property) Base.a: string", ranges: [base] },
    { definition: "(property) HasAOrB.a: string", ranges: [hasAOrB] },
    { definition: "(property) a: string | number", ranges: [x] }
]);
