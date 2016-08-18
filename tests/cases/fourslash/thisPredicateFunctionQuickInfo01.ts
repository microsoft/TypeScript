/// <reference path="fourslash.ts" />

//// class FileSystemObject {
////     /*1*/isFile(): this is Item {
////         return this instanceof Item;
////     }
////     /*2*/isDirectory(): this is Directory {
////         return this instanceof Directory;
////     }
////     /*3*/isNetworked(): this is (Networked & this) {
////        return !!(this as Networked).host;
////     }
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
//// const obj: FileSystemObject = new Item("/foo", "");
//// if (obj.isFile/*4*/()) {
////     obj.;
////     if (obj.isNetworked/*5*/()) {
////         obj.;
////     }
//// }
//// if (obj.isDirectory/*6*/()) {
////     obj.;
////     if (obj.isNetworked/*7*/()) {
////         obj.;
////     }
//// }
//// if (obj.isNetworked/*8*/()) {
////     obj.;
//// }

goTo.marker("1");
verify.quickInfoIs("(method) FileSystemObject.isFile(): this is Item");
goTo.marker("2");
verify.quickInfoIs("(method) FileSystemObject.isDirectory(): this is Directory");
goTo.marker("3");
verify.quickInfoIs("(method) FileSystemObject.isNetworked(): this is Networked & this");

goTo.marker("4");
verify.quickInfoIs("(method) FileSystemObject.isFile(): this is Item");
goTo.marker("5");
verify.quickInfoIs("(method) FileSystemObject.isNetworked(): this is Networked & Item");
goTo.marker("6");
verify.quickInfoIs("(method) FileSystemObject.isDirectory(): this is Directory");
goTo.marker("7");
verify.quickInfoIs("(method) FileSystemObject.isNetworked(): this is Networked & Directory");
goTo.marker("8");
verify.quickInfoIs("(method) FileSystemObject.isNetworked(): this is Networked & FileSystemObject");