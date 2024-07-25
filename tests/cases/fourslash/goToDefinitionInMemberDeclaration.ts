/// <reference path='fourslash.ts' />

////interface /*interfaceDefinition*/IFoo { method1(): number; }
////
////class /*classDefinition*/Foo implements IFoo {
////    public method1(): number { return 0; }
////}
////
////enum /*enumDefinition*/Enum { value1, value2 };
////
////class /*selfDefinition*/Bar {
////    public _interface: [|IFo/*interfaceReference*/o|] = new [|Fo/*classReferenceInInitializer*/o|]();
////    public _class: [|Fo/*classReference*/o|] = new Foo();
////    public _list: [|IF/*interfaceReferenceInList*/oo|][]=[];
////    public _enum: [|E/*enumReference*/num|] = [|En/*enumReferenceInInitializer*/um|].value1;
////    public _self: [|Ba/*selfReference*/r|];
////
////    constructor(public _inConstructor: [|IFo/*interfaceReferenceInConstructor*/o|]) {
////    }
////}

verify.baselineGoToDefinition(
    "interfaceReference", "interfaceReferenceInList", "interfaceReferenceInConstructor",
    "classReference", "classReferenceInInitializer",
    "enumReference", "enumReferenceInInitializer",
    "selfReference",
);
