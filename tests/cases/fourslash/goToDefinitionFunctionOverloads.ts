/// <reference path='fourslash.ts' />

/////*functionOverload1*/function /*functionOverload*/functionOverload();
/////*functionOverload2*/function functionOverload(value: string);
/////*functionOverloadDefinition*/function functionOverload() {}
////
/////*functionOverloadReference1*/functionOverload();
/////*functionOverloadReference2*/functionOverload("123");

goTo.marker('functionOverloadReference1');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');

goTo.marker('functionOverloadReference2');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');

goTo.marker('functionOverload');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');
