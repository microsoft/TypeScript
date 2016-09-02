// @Target: ES6
// @experimentaldecorators: true

////async function f() {}
////
/////*defDecString*/function dec(target: any, propertyKey: string): void;
/////*defDecSymbol*/function dec(target: any, propertyKey: symbol): void;
////function dec(target: any, propertyKey: string | symbol) {}
////
////declare const s: symbol;
////class C {
////    @/*useDecString*/dec f() {}
////    @/*useDecSymbol*/dec [s]() {}
////}

goTo.marker("useDecString");
goTo.definition();
verify.caretAtMarker("defDecString");

goTo.marker("useDecSymbol");
goTo.definition();
verify.caretAtMarker("defDecSymbol");
