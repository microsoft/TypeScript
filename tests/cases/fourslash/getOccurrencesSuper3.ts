/// <reference path='fourslash.ts' />

////let x = {
////    a() {
////        return [|s/**/uper|].b();
////    },
////    b() {
////        return [|super|].a();
////    },
////    c: function () {
////        return [|super|].a();
////    }
////    d: () => [|super|].b();
////}

verify.baselineDocumentHighlights();