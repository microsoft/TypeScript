/// <reference path="fourslash.ts" />

//// module Module {
////     var innerVariable = 1;
////     function innerFunction() { }
////     class innerClass { }
////     module innerModule { }
////     interface innerInterface {}
////     export var exportedVariable = 1;
////     export function exportedFunction() { }
////     export class exportedClass { }
////     export module exportedModule { export var exportedInnerModuleVariable = 1; }
////     export interface exportedInterface {}
//// }
////
////Module./*ValueReference*/;
////
////var x : Module./*TypeReference*/
////
////class TestClass extends Module./*TypeReferenceInExtendsList*/ { }
////
////interface TestInterface implements Module./*TypeReferenceInImplementsList*/ { }

goTo.marker("ValueReference");
verify.completionListContains("exportedVariable");
verify.completionListContains("exportedFunction");
verify.completionListContains("exportedClass");
verify.completionListContains("exportedModule");
// No inner declarations
verify.not.completionListContains("innerVariable");
verify.not.completionListContains("innerClass");
// Include type declarations
verify.completionListContains("exportedInterface");

goTo.marker("TypeReference");
verify.completionListContains("exportedClass");
verify.completionListContains("exportedModule");
verify.completionListContains("exportedInterface");
// Include value completions
verify.completionListContains("exportedVariable");

goTo.marker("TypeReferenceInExtendsList");
verify.completionListContains("exportedClass");
verify.completionListContains("exportedModule");
verify.completionListContains("exportedInterface");
// Include value completions
verify.completionListContains("exportedVariable");


goTo.marker("TypeReferenceInImplementsList");
verify.completionListContains("exportedClass");
verify.completionListContains("exportedModule");
verify.completionListContains("exportedInterface");
// Include value completions
verify.completionListContains("exportedVariable");

