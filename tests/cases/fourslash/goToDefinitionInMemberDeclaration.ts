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


goTo.marker("interfaceReference");
goTo.definition();
verify.caretAtMarker("interfaceDefinition");

goTo.marker("interfaceReferenceInList");
goTo.definition();
verify.caretAtMarker("interfaceDefinition");

goTo.marker("interfaceReferenceInConstructor");
goTo.definition();
verify.caretAtMarker("interfaceDefinition");

goTo.marker("classReference");
goTo.definition();
verify.caretAtMarker("classDefinition");

goTo.marker("classReferenceInInitializer");
goTo.definition();
verify.caretAtMarker("classDefinition");

goTo.marker("enumReference");
goTo.definition();
verify.caretAtMarker("enumDefinition");

goTo.marker("enumReferenceInInitializer");
goTo.definition();
verify.caretAtMarker("enumDefinition");

goTo.marker("selfReference");
goTo.definition();
verify.caretAtMarker("selfDefinition");