/// <reference path='fourslash.ts'/>

//// type User = {
////   name: string;
////   age: number;
//// };
////
//// declare function fn<T>(obj: T, key: keyof T): void;
////
//// declare const user: User;
////
//// fn(user, "name/*1*/");

verify.baselineGoToDefinition("1");
