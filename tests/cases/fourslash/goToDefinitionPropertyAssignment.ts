/// <reference path='fourslash.ts' />

//// export const /*FunctionResult*/Component = () => { return "OK"}
//// Component./*PropertyResult*/displayName = 'Component'
////
//// [|/*FunctionClick*/Component|]
////
//// Component.[|/*PropertyClick*/displayName|]

verify.goToDefinition("FunctionClick", "FunctionResult")

verify.goToDefinition("PropertyClick", "PropertyResult")

// export const Component = () => { return "OK"}
// Component.displayName = 'Component'

