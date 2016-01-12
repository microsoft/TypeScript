/// <reference path="fourslash.ts" />

//// class FileSystemObject {
////     get is/*1*/File(): this is Item {
////         return this instanceof Item;
////     }
////     set is/*2*/File(param) {
////         // noop
////     }
////     get is/*3*/Directory(): this is Directory {
////         return this instanceof Directory;
////     }
////     is/*4*/Networked: this is (Networked & this);
////     constructor(public path: string) {}
//// }
////
//// class Item extends FileSystemObject {
////     constructor(path: string, public content: string) { super(path); }
//// }
//// class Directory extends FileSystemObject {
////     children: FileSystemObject[];
//// }
//// interface Networked {
////     host: string;
//// }
////
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
////     is/*5*/Sundries: this is Crate<Sundries>;
////     is/*6*/Supplies: this is Crate<Supplies>;
////     is/*7*/PackedTight: this is (this & {extraContents: T});
//// }
////
//// const obj: FileSystemObject = new Item("/foo", "");
//// if (obj.is/*8*/File) {
////     obj./*9*/;
////     if (obj.is/*10*/Networked) {
////         obj./*11*/;
////     }
//// }
//// if (obj.is/*12*/Directory) {
////     obj./*13*/;
////     if (obj.is/*14*/Networked) {
////         obj./*15*/;
////     }
//// }
//// if (obj.is/*16*/Networked) {
////     obj./*17*/;
//// }
////
//// const crate: Crate<any>;
//// if (crate.is/*18*/PackedTight) {
////     crate./*19*/;
//// }
//// if (crate.is/*20*/Sundries) {
////     crate.contents./*21*/;
////     if (crate.is/*22*/PackedTight) {
////         crate./*23*/
////     }
//// }
//// if (crate.is/*24*/Supplies) {
////     crate.contents./*25*/;
////     if (crate.is/*26*/PackedTight) {
////         crate./*27*/
////     }
//// }

goTo.marker("1");
verify.quickInfoIs("(property) FileSystemObject.isFile: this is Item");
goTo.marker("2");
verify.quickInfoIs("(property) FileSystemObject.isFile: this is Item");
goTo.marker("3");
verify.quickInfoIs("(property) FileSystemObject.isDirectory: this is Directory");
goTo.marker("4");
verify.quickInfoIs("(property) FileSystemObject.isNetworked: this is Networked & this");
goTo.marker("5");
verify.quickInfoIs("(property) Crate<T>.isSundries: this is Crate<Sundries>");
goTo.marker("6");
verify.quickInfoIs("(property) Crate<T>.isSupplies: this is Crate<Supplies>");
goTo.marker("7");
verify.quickInfoIs(`(property) Crate<T>.isPackedTight: this is this & {
    extraContents: T;
}`);
goTo.marker("8");
verify.quickInfoIs("(property) FileSystemObject.isFile: this is Item");
goTo.marker("10");
verify.quickInfoIs("(property) FileSystemObject.isNetworked: this is Networked & Item");
goTo.marker("12");
verify.quickInfoIs("(property) FileSystemObject.isDirectory: this is Directory");
goTo.marker("14");
verify.quickInfoIs("(property) FileSystemObject.isNetworked: this is Networked & Directory");
goTo.marker("16");
verify.quickInfoIs("(property) FileSystemObject.isNetworked: this is Networked & FileSystemObject");
goTo.marker("18");
verify.quickInfoIs(`(property) Crate<any>.isPackedTight: this is Crate<any> & {
    extraContents: any;
}`);
goTo.marker("20");
verify.quickInfoIs("(property) Crate<any>.isSundries: this is Crate<Sundries>");
goTo.marker("22");
verify.quickInfoIs(`(property) Crate<Sundries>.isPackedTight: this is Crate<Sundries> & {
    extraContents: Sundries;
}`);
goTo.marker("24");
verify.quickInfoIs("(property) Crate<any>.isSupplies: this is Crate<Supplies>");
goTo.marker("26");
verify.quickInfoIs(`(property) Crate<Supplies>.isPackedTight: this is Crate<Supplies> & {
    extraContents: Supplies;
}`);