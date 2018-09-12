/// <reference path="fourslash.ts" />

////interface I { [|{| "isDefinition": true |}x|]: {}; }
////interface J { [|{| "isDefinition": true |}x|]: {}; }
////declare const o: (I | J) & { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: string };
////o.[|x|];

const [r0, r1, r2, r3] = test.ranges();
const i = { definition: "(property) I.x: {}", ranges: [r0] };
const j = { definition: "(property) J.x: {}", ranges: [r1] };
const anon = { definition: "(property) x: string", ranges: [r2] };
const intersect = { definition: "(property) x: string & {}", ranges: [r3] };
verify.referenceGroups(r0, [i, intersect]);
verify.referenceGroups(r1, [j, intersect]);
verify.referenceGroups(r2, [anon, intersect]);
verify.referenceGroups(r3, [i, j, anon, intersect]);
