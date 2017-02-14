/// <reference path='fourslash.ts' />
////let o = { ["[|{| "isDefinition": true |}foo|]"]: 12 };
////let y = o.[|foo|];
////let z = o['[|foo|]'];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) ["foo"]: number', ranges }]);
verify.referenceGroups([r1, r2], []); // TODO: fix
