/// <reference path='fourslash.ts'/>

// @strict: true

//// const { x } = { x/*1*/: 1 };
//// const { x: y } = { x/*2*/: 1 };
////
//// type Foo = {
////   /** awesome prop */
////   x: number;
//// };
//// const { x: z }: Foo = { x/*3*/: 1 };

verify.quickInfoAt("1", "(property) x: number");
verify.quickInfoAt("2", "(property) x: number");
verify.quickInfoAt("3", "(property) x: number", "awesome prop");
