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

verify.completions(
    { marker: ["1", "3", "5"], exact: ["contents", "extraContents", "isPackedTight", "isSundries", "isSupplies"] },
    { marker: "2", exact: "broken" },
    { marker: "4", exact: "spoiled" },
);
