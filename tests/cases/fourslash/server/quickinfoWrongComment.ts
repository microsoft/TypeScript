/// <reference path="../fourslash.ts"/>

//// interface I {
////     /** The colour */
////     readonly colour: string
//// }
//// interface A extends I {
////     readonly colour: "red" | "green";
//// }
//// interface B extends I {
////     readonly colour: "yellow" | "green";
//// }
//// type F = A | B
//// const f: F = { colour: "green" }
//// f.colour/*1*/

goTo.marker("1")
verify.quickInfoIs("(property) colour: \"red\" | \"green\" | \"yellow\"", "The colour")