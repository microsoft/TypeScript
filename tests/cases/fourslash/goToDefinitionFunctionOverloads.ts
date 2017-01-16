/// <reference path='fourslash.ts' />

////function /*functionOverload1*/functionOverload(value: number);
////function /*functionOverload2*/functionOverload(value: string);
////function /*functionOverloadDefinition*/functionOverload() {}
////
/////*functionOverloadReference1*/functionOverload(123);
/////*functionOverloadReference2*/functionOverload("123");
/////*brokenOverload*/functionOverload({});

verify.goToDefinition({
    functionOverloadReference1: "functionOverload1",
    functionOverloadReference2: "functionOverload2",
    brokenOverload: "functionOverload1",
    functionOverload1: "functionOverloadDefinition"
});
