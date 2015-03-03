/// <reference path="fourslash.ts" />

//// interface connectModule {
////     (res, req, next): void;
//// }
//// interface connectExport {
////     use: (mod: connectModule) => connectExport;
////     listen: (port: number) => void;
//// }
//// var server: {
////     (): connectExport;
////     test1: connectModule;
////     test2(): connectModule;
//// };
//// export = server;
//// /*1*/export = connectExport;
////  
//// 

edit.disableFormatting();
goTo.marker('1');

edit.deleteAtCaret(24);

goTo.marker('1');

edit.insert("export = connectExport;\n");
