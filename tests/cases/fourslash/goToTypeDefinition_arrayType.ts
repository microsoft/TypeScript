/// <reference path='fourslash.ts' />

//// type User = { name: string };
//// declare const users: User[]
//// /*reference*/users
////
//// class CustomArray<T> extends Array<T> { immutableReverse() { return [...this].reverse() } }
//// declare const users2: CustomArray<User>
//// /*reference2*/users2

verify.baselineGoToType("reference", "reference2");
