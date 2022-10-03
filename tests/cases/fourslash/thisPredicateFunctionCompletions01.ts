/// <reference path="fourslash.ts" />

//// class FileSystemObject {
////     isFile(): this is Item {
////         return this instanceof Item;
////     }
////     isDirectory(): this is Directory {
////         return this instanceof Directory;
////     }
////     isNetworked(): this is (Networked & this) {
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
//// if (obj.isFile()) {
////     obj./*1*/;
////     if (obj.isNetworked()) {
////         obj./*2*/;
////     }
//// }
//// if (obj.isDirectory()) {
////     obj./*3*/;
////     if (obj.isNetworked()) {
////         obj./*4*/;
////     }
//// }
//// if (obj.isNetworked()) {
////     obj./*5*/;
//// }

const common: ReadonlyArray<string> = ["isFile", "isDirectory", "isNetworked", "path"];
verify.completions(
    { marker: "1", unsorted: ["content", ...common] },
    { marker: "2", unsorted: ["host", "content", ...common] },
    { marker: "3", unsorted: ["children", ...common] },
    { marker: "4", unsorted: ["host", "children", ...common] },
    { marker: "5", unsorted: ["host", ...common] },
);
