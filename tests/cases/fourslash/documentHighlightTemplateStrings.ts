/// <reference path='fourslash.ts'/>

////type Foo = "[|a|]" | "b";
////
////class C {
////   p: Foo = `[|a|]`;
////   m() {
////       switch (this.p) {
////           case `[|a|]`:
////               return 1;
////           case "b":
////               return 2;
////       }
////   }
////}

const [r0, r1, r2] = test.ranges();
verify.baselineDocumentHighlights(r2);
