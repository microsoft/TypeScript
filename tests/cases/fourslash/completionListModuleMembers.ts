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

function getVerify(isTypeLocation: boolean) {
    return {
        verifyValue: isTypeLocation ? verify.not : verify,
        verifyType: isTypeLocation ? verify : verify.not,
        verifyValueOrType: verify,
        verifyNotValueOrType: verify.not,
    };
}

function verifyModuleMembers(marker: string, isTypeLocation: boolean) {
    goTo.marker(marker);

    const { verifyValue, verifyType, verifyValueOrType, verifyNotValueOrType } = getVerify(isTypeLocation);

    verifyValue.completionListContains("exportedVariable");
    verifyValue.completionListContains("exportedFunction");
    verifyValue.completionListContains("exportedModule");

    verifyValueOrType.completionListContains("exportedClass");

    // Include type declarations
    verifyType.completionListContains("exportedInterface");

    // No inner declarations
    verifyNotValueOrType.completionListContains("innerVariable");
    verifyNotValueOrType.completionListContains("innerFunction");
    verifyNotValueOrType.completionListContains("innerClass");
    verifyNotValueOrType.completionListContains("innerModule");
    verifyNotValueOrType.completionListContains("innerInterface");

    verifyNotValueOrType.completionListContains("exportedInnerModuleVariable");
}

verifyModuleMembers("ValueReference", /*isTypeLocation*/ false);
verifyModuleMembers("TypeReference", /*isTypeLocation*/ true);
verifyModuleMembers("TypeReferenceInExtendsList", /*isTypeLocation*/ false);
verifyModuleMembers("TypeReferenceInImplementsList", /*isTypeLocation*/ true);
