/// <reference path='fourslash.ts'/>

////interface A1 { [|a|]: string };
////interface A2 { [|a|]?: number };
////let a12: spread(A1, A2);
////a12.[|a|];
const ranges = test.ranges();
// members of spread types only refer to themselves and the resulting property
verify.referencesOf(ranges[0], [ranges[0], ranges[2]]);
verify.referencesOf(ranges[1], [ranges[1], ranges[2]]);
// but the resulting property refers to everything
verify.referencesOf(ranges[2], ranges);
