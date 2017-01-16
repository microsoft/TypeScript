/// <reference path='fourslash.ts'/>

//// var [|dx|] = "Foo";
////
//// module M { export var [|dx|]; }
//// module M {
////    var z = 100;
////    export var y = { [|dx|], z };
//// }
//// M.y.[|dx|];

const [r0, r1, r2, r3] = test.ranges();
verify.referencesOf(r0, [r0]);
verify.referencesOf(r1, [r1, r2]);
verify.referencesOf(r2, [r1, r2, r3]);
verify.referencesOf(r3, [r2, r3]);
