/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|Class|] {
////}

//@Filename: b.ts
////import { [|Class|] as [|C2|] } from "./a";
////
////var c = new [|C2|]();

//@Filename: c.ts
////export { [|Class|] as [|C3|] } from "./a";

verify.rangesWithSameTextReferenceEachOther();
