/// <reference path="fourslash.ts" />

//// interface Sundries {
////     broken: boolean;
//// }
////
//// interface Supplies {
////     spoiled: boolean;
//// }
////
//// interface Crate<T> {
////     contents: T;
////     isSundries(): this is Crate<Sundries>;
////     isSupplies(): this is Crate<Supplies>;
////     isPackedTight(): this is (this & {extraContents: T});
//// }
//// const crate: Crate<any>;
//// if (crate.isPackedTight()) {
////     crate./*1*/;
//// }
//// if (crate.isSundries()) {
////     crate.contents./*2*/;
////     if (crate.isPackedTight()) {
////         crate./*3*/;
////     }
//// }
//// if (crate.isSupplies()) {
////     crate.contents./*4*/;
////     if (crate.isPackedTight()) {
////         crate./*5*/;
////     }
//// }

goTo.marker("1");
verify.completionListContains("extraContents");
goTo.marker("2");
verify.completionListContains("broken");
goTo.marker("3");
verify.completionListContains("extraContents");
goTo.marker("4");
verify.completionListContains("spoiled");
goTo.marker("5");
verify.completionListContains("extraContents");