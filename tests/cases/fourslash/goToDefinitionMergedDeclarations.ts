/// <reference path="fourslash.ts" />

// @Filename: test.ts
/////*namespaceDecl*/namespace A {
////    export interface B {}
////}
/////*classDecl*/class A {}
/////*interfaceDecl*/interface A {}
////var x: /*usage*/A;

// Test that getDefinitionAtPosition returns the correct kind for each merged declaration
// Issue #22467: Before fix, all three return 'class' (bug)
// After fix: Returns 'module', 'class', 'interface' respectively

verify.baselineGoToDefinition("usage");
