/// <reference path='fourslash.ts' />

////import [|foo|] from 'bar';
////const bar = { [|foo|] };

const [r0, r1] = test.ranges();
verify.renameLocations([r0, r1], [r0, { range: r1, prefixText: "foo: " }]);
