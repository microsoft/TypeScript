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
////     /*1*/isSundries(): this is Crate<Sundries>;
////     /*2*/isSupplies(): this is Crate<Supplies>;
////     /*3*/isPackedTight(): this is (this & {extraContents: T});
//// }
//// const crate: Crate<any>;
//// if (crate.isPackedTight/*4*/()) {
////     crate.;
//// }
//// if (crate.isSundries/*5*/()) {
////     crate.contents.;
////     if (crate.isPackedTight/*6*/()) {
////        crate.;
////     }
//// }
//// if (crate.isSupplies/*7*/()) {
////     crate.contents.;
////     if (crate.isPackedTight/*8*/()) {
////        crate.;
////     }
//// }

goTo.marker("1");
verify.quickInfoIs("(method) Crate<T>.isSundries(): this is Crate<Sundries>");
goTo.marker("2");
verify.quickInfoIs("(method) Crate<T>.isSupplies(): this is Crate<Supplies>");
goTo.marker("3");
verify.quickInfoIs(`(method) Crate<T>.isPackedTight(): this is this & {
    extraContents: T;
}`);
goTo.marker("4");
verify.quickInfoIs(`(method) Crate<any>.isPackedTight(): this is Crate<any> & {
    extraContents: any;
}`);
goTo.marker("5");
verify.quickInfoIs("(method) Crate<any>.isSundries(): this is Crate<Sundries>");
goTo.marker("6");
verify.quickInfoIs(`(method) Crate<Sundries>.isPackedTight(): this is Crate<Sundries> & {
    extraContents: Sundries;
}`);
goTo.marker("7");
verify.quickInfoIs("(method) Crate<any>.isSupplies(): this is Crate<Supplies>");
goTo.marker("8");
verify.quickInfoIs(`(method) Crate<Supplies>.isPackedTight(): this is Crate<Supplies> & {
    extraContents: Supplies;
}`);