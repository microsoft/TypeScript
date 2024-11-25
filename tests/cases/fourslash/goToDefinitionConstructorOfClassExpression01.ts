/// <reference path='fourslash.ts' />

////var x = class C {
////    /*definition*/constructor() {
////        var other = new [|/*xusage*/C|];
////    }
////}
////
////var y = class C extends x {
////    constructor() {
////        super();
////        var other = new [|/*yusage*/C|];
////    }
////}
////var z = class C extends x {
////    m() {
////        return new [|/*zusage*/C|];
////    }
////}
////
////var x1 = new [|/*cref*/C|]();
////var x2 = new [|/*xref*/x|]();
////var y1 = new [|/*yref*/y|]();
////var z1 = new [|/*zref*/z|]();

verify.baselineGoToDefinition("xusage", "yusage", "zusage", "cref", "xref", "yref", "zref");
