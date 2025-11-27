/// <reference path='fourslash.ts' />

// Test inference with qualified names (namespace.Type pattern)

////namespace Outer {
////    export namespace /*innerNamespaceDefinition*/Inner {
////        export const value = 42;
////    }
////
////    export interface /*innerInterfaceDefinition*/Inner {
////        prop: number;
////    }
////}
////
////// Type position with qualified name - should infer interface
////const x: Outer./*typeUsageQualified*/Inner = { prop: 1 };
////
////// Value position with qualified name - should infer namespace
////const y = Outer./*valueUsageQualified*/Inner.value;

goTo.marker("typeUsageQualified");
verify.goToDefinitionInferredIndex("innerInterfaceDefinition");

goTo.marker("valueUsageQualified");
verify.goToDefinitionInferredIndex("innerNamespaceDefinition");
