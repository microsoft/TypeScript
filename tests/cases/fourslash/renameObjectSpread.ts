/// <reference path='fourslash.ts'/>

////interface A1 { [|a|]: number };
////interface A2 { [|a|]?: number };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a|];

const [r0, r1, r2] = test.ranges();
// A1 unions with A2, so rename A1.a and a12.a
verify.renameLocations(r0, [r0, r2]);
// A1 unions with A2, so rename A2.a and a12.a
verify.renameLocations(r1, [r1, r2]);
// a12.a unions A1.a and A2.a, so rename A1.a, A2.a and a12.a
verify.renameLocations(r2, [r0, r1, r2]);
