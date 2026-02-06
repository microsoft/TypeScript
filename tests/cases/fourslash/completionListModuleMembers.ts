/// <reference path="fourslash.ts" />

//// namespace Module {
////     var innerVariable = 1;
////     function innerFunction() { }
////     class innerClass { }
////     namespace innerModule { }
////     interface innerInterface {}
////     export var exportedVariable = 1;
////     export function exportedFunction() { }
////     export class exportedClass { }
////     export namespace exportedModule { export var exportedInnerModuleVariable = 1; }
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

verify.completions(
    {
        marker: ["ValueReference", "TypeReferenceInExtendsList"],
        unsorted: ["exportedFunction", "exportedVariable", "exportedClass", "exportedModule"],
    },
    {
        marker: ["TypeReference", "TypeReferenceInImplementsList"],
        unsorted: ["exportedClass", "exportedInterface"],
    },
);
