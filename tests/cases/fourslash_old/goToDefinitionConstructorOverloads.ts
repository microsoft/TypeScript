/// <reference path='fourslash.ts' />

////class ConstructorOverload {
////    /*constructorOverload1*/constructor();
////    /*constructorOverload2*/constructor(foo: string);
////    /*constructorDefinition*/constructor(foo: any)  { }
////}
////
////var constructorOverload = new /*constructorOverloadReference1*/ConstructorOverload();
////var constructorOverload = new /*constructorOverloadReference2*/ConstructorOverload("foo");

goTo.marker('constructorOverloadReference1');
goTo.definition();
verify.caretAtMarker('constructorOverload1');

goTo.marker('constructorOverloadReference2');
goTo.definition();
verify.caretAtMarker('constructorOverload2');

goTo.marker('constructorOverload1');
goTo.definition();
verify.caretAtMarker('constructorDefinition');
