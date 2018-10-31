/// <reference path="fourslash.ts"/>

////class Other {
////    public p;
////    protected p2
////    private p3;
////}
////
////class Self {
////    private other: Other;
////
////    method() {
////        this.other./*1*/;
////
////        this.other.p/*2*/;
////
////        this.other.p/*3*/.toString();
////    }
////}

verify.completions({ marker: ["1", "2", "3"], exact: "p" });
