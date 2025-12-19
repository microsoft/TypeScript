/// <reference path='fourslash.ts' />

// Test inference in various variable declaration contexts

////namespace /*namespaceDefinition*/Data {
////    export const empty = {};
////}
////
////interface /*interfaceDefinition*/Data {
////    value: string;
////}
////
////// Type annotation - should infer interface
////let a: /*varTypeAnnotation*/Data;
////
////// Const declaration with type - should infer interface
////const b: /*constTypeAnnotation*/Data = { value: "test" };
////
////// Assignment from namespace - should infer namespace
////const c = /*assignmentValue*/Data.empty;
////
////// Function parameter type - should infer interface
////function process(param: /*parameterType*/Data) {
////    return param.value;
////}
////
////// Array type - should infer interface
////const arr: /*arrayElementType*/Data[] = [];
////
////// Generic type argument - should infer interface
////const promise: Promise</*genericTypeArg*/Data> = Promise.resolve({ value: "hello" });

// Type annotations should infer interface
goTo.marker("varTypeAnnotation");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("constTypeAnnotation");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("parameterType");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("arrayElementType");
verify.goToDefinitionInferredIndex("interfaceDefinition");

goTo.marker("genericTypeArg");
verify.goToDefinitionInferredIndex("interfaceDefinition");

// Value usage should infer namespace
goTo.marker("assignmentValue");
verify.goToDefinitionInferredIndex("namespaceDefinition");
