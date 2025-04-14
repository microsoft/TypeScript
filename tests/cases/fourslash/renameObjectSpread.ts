/// <reference path='fourslash.ts'/>

////interface A1 { [|[|{| "contextRangeIndex": 0 |}a|]: number|] };
////interface A2 { [|[|{| "contextRangeIndex": 2 |}a|]?: number|] };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a|];

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.baselineRename([
    // A1 unions with A2, so rename A1.a and a12.a
    r0,
    // A1 unions with A2, so rename A2.a and a12.a
    r1,
    // a12.a unions A1.a and A2.a, so rename A1.a, A2.a and a12.a
    r2,
]);
