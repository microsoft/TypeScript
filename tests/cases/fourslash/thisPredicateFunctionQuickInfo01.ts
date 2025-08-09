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

verify.quickInfos({
    1: "(method) FileSystemObject.isFile(): this is Item",
    2: "(method) FileSystemObject.isDirectory(): this is Directory",
    3: "(method) FileSystemObject.isNetworked(): this is (Networked & this)",

    4: "(method) FileSystemObject.isFile(): this is Item",
    5: "(method) FileSystemObject.isNetworked(): this is (Networked & Item)",
    6: "(method) FileSystemObject.isDirectory(): this is Directory",
    7: "(method) FileSystemObject.isNetworked(): this is (Networked & Directory)",
    8: "(method) FileSystemObject.isNetworked(): this is (Networked & FileSystemObject)"
});
