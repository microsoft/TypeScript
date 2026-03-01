/// <reference path='fourslash.ts' />

////var /*varDef*/x = {
////    [|/*varProp*/x|]
////}
////let /*letDef*/y = {
////    [|/*letProp*/y|]
////}

verify.baselineGoToDefinition(
    "varProp",
    "letProp",
);
