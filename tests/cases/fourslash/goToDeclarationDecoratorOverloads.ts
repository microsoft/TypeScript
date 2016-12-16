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

verify.goToDefinition({
    useDecString: "defDecString",
    useDecSymbol: "defDecSymbol"
});
