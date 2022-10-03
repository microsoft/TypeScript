/// <reference path='fourslash.ts' />

////class C {
////    public foo1() { }
////    public foo2() {
////        return 1/*1*/;
////    }
////    public foo3() { }
////}

goTo.marker("1");
edit.insert(" + 1");