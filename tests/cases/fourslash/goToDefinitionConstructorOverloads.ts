/// <reference path='fourslash.ts' />

////class ConstructorOverload {
////    constructor();
////    constructor(foo: string);
////    /*constructorOverload*/constructor(foo: any)  { }
////}
////
////var constructorOverload = new /*constructorOverloadReference*/ConstructorOverload();

goTo.marker('constructorOverloadReference');
goTo.definition();
verify.caretAtMarker('constructorOverload');

goTo.marker('constructorOverload');
goTo.definition();
verify.caretAtMarker('constructorOverload');
