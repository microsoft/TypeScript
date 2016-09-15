/// <reference path='fourslash.ts' />

/////*functionOverload1*/function /*functionOverload*/functionOverload(value: number);
/////*functionOverload2*/function functionOverload(value: string);
/////*functionOverloadDefinition*/function functionOverload() {}
////
/////*functionOverloadReference1*/functionOverload(123);
/////*functionOverloadReference2*/functionOverload("123");
/////*brokenOverload*/functionOverload({});

verify.goToDefinition({
    functionOverloadReference1: "functionOverload1",
    functionOverloadReference2: "functionOverload2",
    brokenOverload: "functionOverload1",
    functionOverload: "functionOverloadDefinition"
});
