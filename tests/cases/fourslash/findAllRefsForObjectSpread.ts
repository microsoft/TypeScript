/// <reference path='fourslash.ts'/>

////interface A1 { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: string };
////interface A2 { [|{| "isWriteAccess": true, "isDefinition": true |}a|]?: number };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a|];
const ranges = test.ranges();
const [r0, r1, r2] = ranges;

// members of spread types only refer to themselves and the resulting property
verify.referenceGroups(r0, [{ definition: "(property) A1.a: string", ranges: [r0, r2] }]);
verify.referenceGroups(r1, [{ definition: "(property) A2.a: number", ranges: [r1, r2] }]);

// but the resulting property refers to everything
verify.referenceGroups(r2, [
    { definition: "(property) A1.a: string", ranges: [r0] },
    { definition: "(property) A2.a: number", ranges: [r1] },
    { definition: "(property) a: string | number", ranges: [r2] }
]);
