/// <reference path='fourslash.ts' />

/////*defFNumber*/function f(strs: TemplateStringsArray, x: number): void;
/////*defFBool*/function f(strs: TemplateStringsArray, x: boolean): void;
////function f(strs: TemplateStringsArray, x: number | boolean) {}
////
/////*useFNumber*/f`${0}`;
/////*useFBool*/f`${false}`;

goTo.marker("useFNumber");
goTo.definition();
verify.caretAtMarker("defFNumber");

goTo.marker("useFBool");
goTo.definition();
verify.caretAtMarker("defFBool");
