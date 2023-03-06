///<reference path="fourslash.ts" />

////class [|/*def*/E|] extends Error {}
////
/////**
//// * @throws {/*use*/[|E|]}
//// */
////function f() {}

goTo.marker("use");
verify.goToDefinitionIs("def");
