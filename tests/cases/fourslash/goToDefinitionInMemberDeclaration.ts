/// <reference path='fourslash.ts' />

/////*interfaceDefinition*/interface IFoo { method1(): number; }
////
/////*classDefinition*/class Foo implements IFoo {
////    public method1(): number { return 0; }
////}
////
/////*enumDefinition*/enum Enum { value1, value2 };
////
/////*selfDefinition*/class Bar {
////    public _interface: IFo/*interfaceReference*/o = new Fo/*classReferenceInInitializer*/o();
////    public _class: Fo/*classReference*/o = new Foo();
////    public _list: IF/*interfaceReferenceInList*/oo[]=[];
////    public _enum: E/*enumReference*/num = En/*enumReferenceInInitializer*/um.value1;
////    public _self: Ba/*selfReference*/r;
////
////    constructor(public _inConstructor: IFo/*interfaceReferenceInConstructor*/o) {
////    }
////}

verify.goToDefinition([
    [["interfaceReference", "interfaceReferenceInList", "interfaceReferenceInConstructor"], "interfaceDefinition"],
    [["classReference", "classReferenceInInitializer"], "classDefinition"],
    [["enumReference", "enumReferenceInInitializer"], "enumDefinition"],
    ["selfReference", "selfDefinition"]
]);
