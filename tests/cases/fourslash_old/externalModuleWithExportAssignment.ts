/// <reference path='fourslash.ts' />

// @Filename: externalModuleWithExportAssignment_file0.ts
////module m2 {
////    export interface connectModule {
////        (res, req, next): void;
////    }
////    export interface connectExport {
////        use: (mod: connectModule) => connectExport;
////        listen: (port: number) => void;
////    }
////}
////var m2: {
////    (): m2.connectExport;
////    test1: m2.connectModule;
////    test2(): m2.connectModule;
////};
////export = m2;

// @Filename: externalModuleWithExportAssignment_file1.ts
////import /*1*/a1 = require("externalModuleWithExportAssignment_file0");
////export var /*2*/a = a1;
////a./*3*/test1(/*4*/null, null, null);
////var /*6*/r1 = a.test2(/*5*/);
////var /*8*/r2 = a(/*7*/);
////a1./*9*/test1(/*10*/null, null, null);
////var /*12*/r3 = a1.test2(/*11*/);
////var /*14*/r4 = a1(/*13*/);
////var v1: a1./*15*/connectExport;

goTo.file("externalModuleWithExportAssignment_file1.ts");
goTo.marker('1');
verify.quickInfoIs("a1");

goTo.marker('2');
verify.quickInfoIs("{ test1: a1.connectModule; test2(): a1.connectModule; (): a1.connectExport; }", undefined, "a", "var");

goTo.marker('3');
verify.quickInfoIs("(res: any, req: any, next: any): void", undefined, "a1.connectModule", "function");
verify.completionListContains("test1", "a1.connectModule", undefined, "test1", "property");
verify.completionListContains("test2", "(): a1.connectModule", undefined, "test2", "method");
verify.not.completionListContains("connectModule");
verify.not.completionListContains("connectExport");

goTo.marker('4');
verify.currentSignatureHelpIs("test1(res: any, req: any, next: any): void");

goTo.marker('5');
verify.currentSignatureHelpIs("test2(): a1.connectModule");

goTo.marker('6');
verify.quickInfoIs("a1.connectModule", undefined, "r1", "var");

goTo.marker('7');
verify.currentSignatureHelpIs("a(): a1.connectExport");

goTo.marker('8');
verify.quickInfoIs("a1.connectExport", undefined, "r2", "var");

goTo.marker('9');
verify.quickInfoIs("(res: any, req: any, next: any): void", undefined, "a1.connectModule", "function");
verify.completionListContains("test1", "a1.connectModule", undefined, "test1", "property");
verify.completionListContains("test2", "(): a1.connectModule", undefined, "test2", "method");
verify.not.completionListContains("connectModule");
verify.not.completionListContains("connectExport");

goTo.marker('10');
verify.currentSignatureHelpIs("test1(res: any, req: any, next: any): void");

goTo.marker('11');
verify.currentSignatureHelpIs("test2(): a1.connectModule");

goTo.marker('12');
verify.quickInfoIs("a1.connectModule", undefined, "r3", "var");

goTo.marker('13');
verify.currentSignatureHelpIs("a1(): a1.connectExport");

goTo.marker('14');
verify.quickInfoIs("a1.connectExport", undefined, "r4", "var");

goTo.marker('15');
verify.not.completionListContains("test1", "a1.connectModule", undefined, "test1", "property");
verify.not.completionListContains("test2", "(): a1.connectModule", undefined, "test2", "method");
verify.completionListContains("connectModule", "a1.connectModule", undefined, "a1.connectModule", "interface");
verify.completionListContains("connectExport", "a1.connectExport", undefined, "a1.connectExport", "interface");

