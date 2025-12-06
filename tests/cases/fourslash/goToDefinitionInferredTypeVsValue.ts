/// <reference path='fourslash.ts' />

// Test that GTD infers type definition when used in type position
// and value definition when used in value position

////namespace /*namespaceDefinition*/Foo {
////    export const x = 1;
////}
////
////interface /*interfaceDefinition*/Foo {
////    prop: string;
////}
////
////// Type position - should infer interface
////const a: /*typeUsage*/Foo = { prop: "hello" };
////
////// Value position - should infer namespace
////const b = /*valueUsage*/Foo.x;

goTo.marker("typeUsage");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("valueUsage");
verify.goToDefinitionInferredIndex("namespaceDefinition");
