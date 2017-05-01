///<reference path="fourslash.ts" />

////abstract class B {
////    private privateMethod() { }
////    protected protectedMethod() { };
////    static staticMethod() { }
////    abstract getValue(): number;
////    /*abstractClass*/
////}
////class C extends B {
////    /*classThatIsEmptyAndExtendingAnotherClass*/
////}
////class D extends B {
////    /*classThatHasAlreadyImplementedAnotherClassMethod*/
////    getValue() {
////        return 10;
////    }
////    /*classThatHasAlreadyImplementedAnotherClassMethodAfterMethod*/
////}
////class E {
////    /*classThatDoesNotExtendAnotherClass*/
////}
////class F extends B {
////    public /*classThatHasWrittenPublicKeyword*/
////}
////class G extends B {
////    static /*classElementContainingStatic*/
////}
////class H extends B {
////    prop/*classThatStartedWritingIdentifier*/
////}
////class I extends B {
////    prop0: number
////    /*propDeclarationWithoutSemicolon*/
////    prop: number;
////    /*propDeclarationWithSemicolon*/
////    prop1 = 10;
////    /*propAssignmentWithSemicolon*/
////    prop2 = 10
////    /*propAssignmentWithoutSemicolon*/
////    method(): number
////    /*methodSignatureWithoutSemicolon*/
////    method2(): number;
////    /*methodSignatureWithSemicolon*/
////    method3() {
////        /*InsideMethod*/
////    }
////    /*methodImplementation*/
////    get c()
////    /*accessorSignatureWithoutSemicolon*/
////    set c()
////    {
////    }
////    /*accessorSignatureImplementation*/
////}
////class J extends B {
////    get /*classThatHasWrittenGetKeyword*/
////}
////class K extends B {
////    set /*classThatHasWrittenSetKeyword*/
////}
////class J extends B {
////    get identi/*classThatStartedWritingIdentifierOfGetAccessor*/
////}
////class K extends B {
////    set identi/*classThatStartedWritingIdentifierOfSetAccessor*/
////}
////class L extends B {
////    public identi/*classThatStartedWritingIdentifierAfterModifier*/
////}
////class L extends B {
////    static identi/*classThatStartedWritingIdentifierAfterStaticModifier*/
////}

const allowedKeywordCount = verify.allowedClassElementKeywords.length;
const nonClassElementMarkers = [
    "InsideMethod"
];
for (const marker of nonClassElementMarkers) {
    goTo.marker(marker);
    verify.not.completionListContains("getValue");
    verify.not.completionListIsEmpty();
}

// Only keywords allowed at this position since they dont extend the class
const onlyClassElementKeywordLocations = [
    "abstractClass",
    "classThatDoesNotExtendAnotherClass"
];
for (const marker of onlyClassElementKeywordLocations) {
    goTo.marker(marker);
    verify.completionListContainsClassElementKeywords();
    verify.completionListCount(allowedKeywordCount);
}

// Base members and class member keywords allowed
const classElementCompletionLocations = [
    "classThatIsEmptyAndExtendingAnotherClass",
    "classThatHasAlreadyImplementedAnotherClassMethod",
    "classThatHasAlreadyImplementedAnotherClassMethodAfterMethod",
    "classThatHasWrittenPublicKeyword",
    "classElementContainingStatic",
    "classThatStartedWritingIdentifier",
    "propDeclarationWithoutSemicolon",
    "propDeclarationWithSemicolon",
    "propAssignmentWithSemicolon",
    "propAssignmentWithoutSemicolon",
    "methodSignatureWithoutSemicolon",
    "methodSignatureWithSemicolon",
    "methodImplementation",
    "accessorSignatureWithoutSemicolon",
    "accessorSignatureImplementation",
    "classThatHasWrittenGetKeyword",
    "classThatHasWrittenSetKeyword",
    "classThatStartedWritingIdentifierOfGetAccessor",
    "classThatStartedWritingIdentifierOfSetAccessor",
    "classThatStartedWritingIdentifierAfterModifier",
    "classThatStartedWritingIdentifierAfterStaticModifier"
];

const validMembersOfBase = [
    ["getValue", "(method) B.getValue(): number"],
    ["protectedMethod", "(method) B.protectedMethod(): void"]
];
const invalidMembersOfBase = [
    ["privateMethod", "(method) B.privateMethod(): void"],
    ["staticMethod", "(method) B.staticMethod(): void"]
];
for (const marker of classElementCompletionLocations) {
    goTo.marker(marker);
    for (const [validMemberOfBaseSymbol, validMemberOfBaseText] of validMembersOfBase) {
        verify.completionListContains(validMemberOfBaseSymbol, validMemberOfBaseText, /*documentation*/ undefined, "method");
    }
    for (const [invalidMemberOfBaseSymbol, invalidMemberOfBaseText] of invalidMembersOfBase) {
        verify.not.completionListContains(invalidMemberOfBaseSymbol, invalidMemberOfBaseText, /*documentation*/ undefined, "method");
    }
    verify.completionListContainsClassElementKeywords();
    verify.completionListCount(allowedKeywordCount + validMembersOfBase.length);
}