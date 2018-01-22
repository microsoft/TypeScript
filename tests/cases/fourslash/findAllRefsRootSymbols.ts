/// <reference path="fourslash.ts" />

////interface I { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: {}; }
////interface J { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: {}; }
////declare const o: (I | J) & { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: string };
////o.[|x|];

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups(r0, [{ definition: "(property) I.x: {}", ranges: [r0, r3] }]);
verify.referenceGroups(r1, [{ definition: "(property) J.x: {}", ranges: [r1, r3] }]);
verify.referenceGroups(r2, [{ definition: "(property) x: string", ranges: [r2, r3] }]);
verify.referenceGroups(r3, [
	{ definition: "(property) I.x: {}", ranges: [r0, r3] },
	{ definition: "(property) J.x: {}", ranges: [r1] },
	{ definition: "(property) x: string", ranges: [r2] },
]);
