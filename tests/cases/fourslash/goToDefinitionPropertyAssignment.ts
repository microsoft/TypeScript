/// <reference path='fourslash.ts' />

//// export const /*FunctionResult*/Component = () => { return "OK"}
//// Component./*PropertyResult*/displayName = 'Component'
////
//// [|/*FunctionClick*/Component|]
////
//// Component.[|/*PropertyClick*/displayName|]

verify.baselineGoToDefinition(
    "FunctionClick",
    "PropertyClick",
);