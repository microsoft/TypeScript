/// <reference path='fourslash.ts' />

////var x = class C {
////    /*definition*/constructor() {
////        var other = new /*usage*/C;
////    }
////}

verify.goToDefinition("usage", "definition");
