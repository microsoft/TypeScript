/// <reference path='fourslash.ts' />

/////*functionOverload1*/function /*functionOverload*/functionOverload(value: number);
/////*functionOverload2*/function functionOverload(value: string);
/////*functionOverloadDefinition*/function functionOverload() {}
////
/////*functionOverloadReference1*/functionOverload(123);
/////*functionOverloadReference2*/functionOverload("123");
/////*brokenOverload*/functionOverload({});

goTo.marker('functionOverloadReference1');
goTo.definition();
verify.caretAtMarker('functionOverload1');

goTo.marker('functionOverloadReference2');
goTo.definition();
verify.caretAtMarker('functionOverload2');

goTo.marker('brokenOverload');
goTo.definition();
verify.caretAtMarker('functionOverload1');

goTo.marker('functionOverload');
goTo.definition();
verify.caretAtMarker('functionOverloadDefinition');
