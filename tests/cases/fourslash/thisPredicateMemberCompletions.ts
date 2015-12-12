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

goTo.marker("9");
verify.completionListContains("content");
goTo.marker("11");
verify.completionListContains("host");
goTo.marker("13");
verify.completionListContains("children");
goTo.marker("15");
verify.completionListContains("host");
goTo.marker("17");
verify.completionListContains("host");
goTo.marker("19");
verify.completionListContains("extraContents");
goTo.marker("21");
verify.completionListContains("broken");
goTo.marker("23");
verify.completionListContains("extraContents");
goTo.marker("25");
verify.completionListContains("spoiled");
goTo.marker("27");
verify.completionListContains("extraContents");