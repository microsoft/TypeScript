/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export default function /*def*/[|f|]() {}

// @Filename: b.ts
////import [|g|] from "./a";
/////*ref*/[|g|]();

verify.rangesReferenceEachOther();
verify.goToDefinition("ref", "def");
