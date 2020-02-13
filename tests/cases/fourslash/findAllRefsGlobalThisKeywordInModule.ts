/// <reference path='fourslash.ts' />
// @noLib: true

////[|this|];
////export const c = 1;

const [glob] = test.ranges();
verify.referenceGroups(glob, undefined);
