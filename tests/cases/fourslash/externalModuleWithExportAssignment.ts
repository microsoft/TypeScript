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
////import /*1*/a1 = require("./externalModuleWithExportAssignment_file0");
////export var /*2*/a = a1;
////a./*3*/test1(/*4*/null, null, null);
////var /*6*/r1 = a.test2(/*5*/);
////var /*8*/r2 = a(/*7*/);
////a1./*9*/test1(/*10*/null, null, null);
////var /*12*/r3 = a1.test2(/*11*/);
////var /*14*/r4 = a1(/*13*/);
////var v1: a1./*15*/connectExport;

goTo.file("externalModuleWithExportAssignment_file1.ts");
verify.quickInfoAt("1", 'import a1 = require("./externalModuleWithExportAssignment_file0")');
verify.quickInfoAt("2", "var a: {\n    (): a1.connectExport;\n    test1: a1.connectModule;\n    test2(): a1.connectModule;\n}", undefined);

goTo.marker('3');
verify.quickInfoIs("(property) test1: a1.connectModule(res: any, req: any, next: any) => void", undefined);
verify.completionListContains("test1", "(property) test1: a1.connectModule(res: any, req: any, next: any) => void", undefined);
verify.completionListContains("test2", "(method) test2(): a1.connectModule", undefined);
verify.not.completionListContains("connectModule");
verify.not.completionListContains("connectExport");

goTo.marker('4');
verify.currentSignatureHelpIs("test1(res: any, req: any, next: any): void");

goTo.marker('5');
verify.currentSignatureHelpIs("test2(): a1.connectModule");

verify.quickInfoAt("6", "var r1: a1.connectModule", undefined);

goTo.marker('7');
verify.currentSignatureHelpIs("a(): a1.connectExport");

verify.quickInfoAt("8", "var r2: a1.connectExport", undefined);

goTo.marker('9');
verify.quickInfoIs("(property) test1: a1.connectModule(res: any, req: any, next: any) => void", undefined);
verify.completionListContains("test1", "(property) test1: a1.connectModule(res: any, req: any, next: any) => void", undefined);
verify.completionListContains("test2", "(method) test2(): a1.connectModule", undefined);
verify.not.completionListContains("connectModule");
verify.not.completionListContains("connectExport");

goTo.marker('10');
verify.currentSignatureHelpIs("test1(res: any, req: any, next: any): void");

goTo.marker('11');
verify.currentSignatureHelpIs("test2(): a1.connectModule");

verify.quickInfoAt("12", "var r3: a1.connectModule", undefined);

goTo.marker('13');
verify.currentSignatureHelpIs("a1(): a1.connectExport");

verify.quickInfoAt("14", "var r4: a1.connectExport", undefined);

goTo.marker('15');
verify.not.completionListContains("test1", "(property) test1: a1.connectModule", undefined);
verify.not.completionListContains("test2", "(method) test2(): a1.connectModule", undefined);
verify.completionListContains("connectModule", "interface a1.connectModule", undefined);
verify.completionListContains("connectExport", "interface a1.connectExport", undefined);

