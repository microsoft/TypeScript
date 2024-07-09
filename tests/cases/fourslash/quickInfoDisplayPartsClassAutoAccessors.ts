/// <reference path='fourslash.ts'/>

////class c {
////    public accessor /*1a*/publicProperty: string;
////    private accessor /*2a*/privateProperty: string;
////    protected accessor /*3a*/protectedProperty: string;
////    static accessor /*4a*/staticProperty: string;
////    private static accessor /*5a*/privateStaticProperty: string;
////    protected static accessor /*6a*/protectedStaticProperty: string;
////    method() {
////        var x: string;
////        x = this./*1g*/publicProperty;
////        x = this./*2g*/privateProperty;
////        x = this./*3g*/protectedProperty;
////        x = c./*4g*/staticProperty;
////        x = c./*5g*/privateStaticProperty;
////        x = c./*6g*/protectedStaticProperty;
////        this./*1s*/publicProperty = "";
////        this./*2s*/privateProperty = "";
////        this./*3s*/protectedProperty = "";
////        c./*4s*/staticProperty = "";
////        c./*5s*/privateStaticProperty = "";
////        c./*6s*/protectedStaticProperty = "";
////    }
////}
////var cInstance = new c();
////var y: string;
////y = /*7g*/cInstance./*8g*/publicProperty;
////y = /*9g*/c./*10g*/staticProperty;
/////*7s*/cInstance./*8s*/publicProperty = y;
/////*9s*/c./*10s*/staticProperty = y;

verify.baselineQuickInfo();