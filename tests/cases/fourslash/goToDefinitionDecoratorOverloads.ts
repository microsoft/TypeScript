// @Target: ES6
// @experimentaldecorators: true

////async function f() {}
////
////function /*defDecString*/dec(target: any, propertyKey: string): void;
////function /*defDecSymbol*/dec(target: any, propertyKey: symbol): void;
////function dec(target: any, propertyKey: string | symbol) {}
////
////declare const s: symbol;
////class C {
////    @[|/*useDecString*/dec|] f() {}
////    @[|/*useDecSymbol*/dec|] [s]() {}
////}

verify.baselineGoToDefinition(
    "useDecString",
    "useDecSymbol",
);
