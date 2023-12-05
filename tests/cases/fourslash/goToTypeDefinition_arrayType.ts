/// <reference path='fourslash.ts' />

//// type User = { name: string };
//// declare const users: User[]
//// /*reference*/users
////
//// type UsersArr = Array<User>
//// declare const users2: UsersArr
//// /*reference2*/users2
////
//// class CustomArray<T> extends Array<T> { immutableReverse() { return [...this].reverse() } }
//// declare const users3: CustomArray<User>
//// /*reference3*/users3

verify.baselineGoToType("reference", "reference2", "reference3");
