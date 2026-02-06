/// <reference path="fourslash.ts"/>

//// import { a1, a2 } from "a";
//// ;
//// import {
//// } from "a";
//// ;
//// import [|{
////   b1,
////   b2,
//// }|] from "b";
//// ;
//// import j1 from "./j" with { type: "json" };
//// ;
//// import j2 from "./j" with {
//// };
//// ;
//// import j3 from "./j" with [|{
////   type: "json"
//// }|];
//// ;
//// [|import { a5, a6 } from "a";
//// import [|{
////   a7,
////   a8,
//// }|] from "a";|]
//// export { a1, a2 };
//// ;
//// export { a3, a4 } from "a";
//// ;
//// export {
//// };
//// ;
//// export [|{
////   b1,
////   b2,
//// }|];
//// ;
//// export {
//// } from "b";
//// ;
//// export [|{
////   b3,
////   b4,
//// }|] from "b";
//// ;

verify.outliningSpansInCurrentFile(test.ranges());
