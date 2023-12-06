///<reference path="fourslash.ts" />

////class [|/*def*/E|] extends Error {}
////
/////**
//// * @throws {/*use*/[|E|]}
//// */
////function f() {}

verify.baselineGetDefinitionAtPosition("use");
