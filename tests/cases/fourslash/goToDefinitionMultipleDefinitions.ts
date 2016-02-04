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

goTo.marker('interfaceReference');
goTo.definition(0);
verify.caretAtMarker('interfaceDefinition1');

goTo.marker('interfaceReference');
goTo.definition(1);
verify.caretAtMarker('interfaceDefinition2');

goTo.marker('interfaceReference');
goTo.definition(2);
verify.caretAtMarker('interfaceDefinition3');


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

goTo.marker('moduleReference');
goTo.definition(0);
verify.caretAtMarker('moduleDefinition1');

goTo.marker('moduleReference');
goTo.definition(1);
verify.caretAtMarker('moduleDefinition2');
