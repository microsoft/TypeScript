/// <reference path='fourslash.ts' />

// @Filename: a.ts
/////*interfaceDefinition1*/interface IFoo {
////    instance1: number;
////}

// @Filename: b.ts
/////*interfaceDefinition2*/interface IFoo {
////    instance2: number;
////}
////
/////*interfaceDefinition3*/interface IFoo {
////    instance3: number;
////}
////
////var ifoo: IFo/*interfaceReference*/o;

verify.goToDefinition("interfaceReference", ["interfaceDefinition1", "interfaceDefinition2", "interfaceDefinition3"]);

// @Filename: c.ts
/////*moduleDefinition1*/module Module {
////    export class c1 { }
////}

// @Filename: d.ts
/////*moduleDefinition2*/module Module {
////    export class c2 { }
////}

// @Filename: e.ts
////Modul/*moduleReference*/e;

verify.goToDefinition("moduleReference", ["moduleDefinition1", "moduleDefinition2"]);
