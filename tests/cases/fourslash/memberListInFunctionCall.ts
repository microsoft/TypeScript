/// <reference path='fourslash.ts' />

////function aa(x: any) {}
////aa({
////  "1": function () {
////    var b = "";
////    b/**/;
////  }
////});

goTo.marker();
edit.insert('.');
verify.completions({ includes: "charAt" });

