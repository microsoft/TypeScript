/// <reference path='fourslash.ts'/>

//// var [|name|] = "Foo";
////
//// var obj = { [|name|] };
//// var obj1 = { [|name|]:[|name|] };
//// obj.[|name|];

const [r0, r1, r2, r3, r4] = test.ranges();
verify.referencesOf(r0, [r0, r1, r3]);
verify.referencesOf(r1, [r0, r1, r3, r4]);
verify.referencesOf(r2, [r2]);
verify.referencesOf(r3, [r0, r1, r3]);
verify.referencesOf(r4, [r1, r4]);
