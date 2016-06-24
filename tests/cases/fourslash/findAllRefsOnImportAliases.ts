/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|Class|] {
////}

//@Filename: b.ts
////import { [|Class|] } from "./a";
////
////var c = new [|Class|]();

//@Filename: c.ts
////export { [|Class|] } from "./a";

verify.rangesReferenceEachOther();
