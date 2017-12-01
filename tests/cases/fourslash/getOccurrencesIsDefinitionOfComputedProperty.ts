/// <reference path='fourslash.ts' />
////let o = { ["[|{| "isDefinition": true |}foo|]"]: 12 };
////let y = o.[|foo|];
////let z = o['[|foo|]'];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) ["foo"]: number', ranges }]);
verify.referenceGroups([r1, r2], [
	// TODO: these are the same thing, should be in the same group.
	{ definition: "(property) [\"foo\"]: number", ranges: [r0] },
	{ definition: "(property) [\"foo\"]: number", ranges: [r1, r2] },
]);
