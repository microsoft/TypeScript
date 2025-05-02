/// <reference path='fourslash.ts' />

//// type User = { id: number; name: string; };
//// declare const user: Pick<User, "name">
//// /*reference*/user
////
//// type PickedUser = Pick<User, "name">
//// declare const user2: PickedUser
//// /*reference2*/user2

verify.baselineGoToType("reference", "reference2");
