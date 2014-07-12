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
verify.memberListContains("exportedVariable");
verify.memberListContains("exportedFunction");
verify.memberListContains("exportedClass");
verify.memberListContains("exportedModule");
// No inner declarations
verify.not.memberListContains("innerVariable");
verify.not.memberListContains("innerClass");
// Include type declarations
verify.memberListContains("exportedInterface");

goTo.marker("TypeReference");
verify.memberListContains("exportedClass");
verify.memberListContains("exportedModule");
verify.memberListContains("exportedInterface");
// Include value completions
verify.memberListContains("exportedVariable");

goTo.marker("TypeReferenceInExtendsList");
verify.memberListContains("exportedClass");
verify.memberListContains("exportedModule");
verify.memberListContains("exportedInterface");
// Include value completions
verify.memberListContains("exportedVariable");


goTo.marker("TypeReferenceInImplementsList");
verify.memberListContains("exportedClass");
verify.memberListContains("exportedModule");
verify.memberListContains("exportedInterface");
// Include value completions
verify.memberListContains("exportedVariable");

