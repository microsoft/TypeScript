/// <reference path='fourslash.ts' />

// Test inference with type alias vs const

////type /*typeAliasDefinition*/Result = { success: boolean };
////
////const /*constDefinition*/Result = { success: true };
////
////// Type position - should infer type alias
////function process(): /*typeUsage*/Result {
////    return { success: false };
////}
////
////// Value position - should infer const
////const x = /*valueUsage*/Result.success;

goTo.marker("typeUsage");
verify.goToDefinitionInferredIndex("typeAliasDefinition");

goTo.marker("valueUsage");
verify.goToDefinitionInferredIndex("constDefinition");
