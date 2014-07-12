/// <reference path='fourslash.ts' />

////function /*functionOverload*/functionOverload();
////function functionOverload(value: string);
/////*functionOverloadDefinition*/function functionOverload(value: any) {}
////
/////*functionOverloadReference*/functionOverload()

goTo.marker('functionOverloadReference');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');

goTo.marker('functionOverload');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');
