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
////class D1 extends B {
////    /*classThatHasDifferentMethodThanBase*/
////    getValue1() {
////        return 10;
////    }
////    /*classThatHasDifferentMethodThanBaseAfterMethod*/
////}
////class D2 extends B {
////    /*classThatHasAlreadyImplementedAnotherClassProtectedMethod*/
////    protectedMethod() {
////    }
////    /*classThatHasDifferentMethodThanBaseAfterProtectedMethod*/
////}
////class E {
////    /*classThatDoesNotExtendAnotherClass*/
////}
////class F extends B {
////    public /*classThatHasWrittenPublicKeyword*/
////}
////class F2 extends B {
////    private /*classThatHasWrittenPrivateKeyword*/
////}
////class G extends B {
////    static /*classElementContainingStatic*/
////}
////class G2 extends B {
////    private static /*classElementContainingPrivateStatic*/
////}
////class H extends B {
////    prop/*classThatStartedWritingIdentifier*/
////}
//////Class for location verification
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
////class L2 extends B {
////    private identi/*classThatStartedWritingIdentifierAfterPrivateModifier*/
////}
////class M extends B {
////    static identi/*classThatStartedWritingIdentifierAfterStaticModifier*/
////}
////class M extends B {
////    private static identi/*classThatStartedWritingIdentifierAfterPrivateStaticModifier*/
////}
////class N extends B {
////    async /*classThatHasWrittenAsyncKeyword*/
////}

const allowedKeywordCount = verify.allowedClassElementKeywords.length;
type CompletionInfo = [string, string];
type CompletionInfoVerifier = { validMembers: CompletionInfo[], invalidMembers: CompletionInfo[] };

function verifyClassElementLocations({ validMembers, invalidMembers }: CompletionInfoVerifier, classElementCompletionLocations: string[]) {
    for (const marker of classElementCompletionLocations) {
        goTo.marker(marker);
        verifyCompletionInfo(validMembers, verify);
        verifyCompletionInfo(invalidMembers, verify.not);
        verify.completionListContainsClassElementKeywords();
        verify.completionListCount(allowedKeywordCount + validMembers.length);
    }
}

function verifyCompletionInfo(memberInfo: CompletionInfo[], verify: FourSlashInterface.verifyNegatable) {
    for (const [symbol, text] of memberInfo) {
        verify.completionListContains(symbol, text, /*documentation*/ undefined, "method");
    }
}

const allMembersOfBase: CompletionInfo[] = [
    ["getValue", "(method) B.getValue(): number"],
    ["protectedMethod", "(method) B.protectedMethod(): void"],
    ["privateMethod", "(method) B.privateMethod(): void"],
    ["staticMethod", "(method) B.staticMethod(): void"]
];
function filterCompletionInfo(fn: (a: CompletionInfo) => boolean): CompletionInfoVerifier {
    const validMembers: CompletionInfo[] = [];
    const invalidMembers: CompletionInfo[] = [];
    for (const member of allMembersOfBase) {
        if (fn(member)) {
            validMembers.push(member);
        }
        else {
            invalidMembers.push(member);
        }
    }
    return { validMembers, invalidMembers };
}


const instanceMemberInfo = filterCompletionInfo(([a]: CompletionInfo) => a === "getValue" || a === "protectedMethod");
const staticMemberInfo = filterCompletionInfo(([a]: CompletionInfo) => a === "staticMethod");
const instanceWithoutProtectedMemberInfo = filterCompletionInfo(([a]: CompletionInfo) => a === "getValue");
const instanceWithoutPublicMemberInfo = filterCompletionInfo(([a]: CompletionInfo) => a === "protectedMethod");

// Not a class element declaration location
const nonClassElementMarkers = [
    "InsideMethod"
];
for (const marker of nonClassElementMarkers) {
    goTo.marker(marker);
    verifyCompletionInfo(allMembersOfBase, verify.not);
    verify.not.completionListIsEmpty();
}

// Only keywords allowed at this position since they dont extend the class or are private
const onlyClassElementKeywordLocations = [
    "abstractClass",
    "classThatDoesNotExtendAnotherClass",
    "classThatHasWrittenPrivateKeyword",
    "classElementContainingPrivateStatic",
    "classThatStartedWritingIdentifierAfterPrivateModifier",
    "classThatStartedWritingIdentifierAfterPrivateStaticModifier"
];
verifyClassElementLocations({ validMembers: [], invalidMembers: allMembersOfBase }, onlyClassElementKeywordLocations);

// Instance base members and class member keywords allowed
const classInstanceElementLocations = [
    "classThatIsEmptyAndExtendingAnotherClass",
    "classThatHasDifferentMethodThanBase",
    "classThatHasDifferentMethodThanBaseAfterMethod",
    "classThatHasWrittenPublicKeyword",
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
    "classThatHasWrittenAsyncKeyword"
];
verifyClassElementLocations(instanceMemberInfo, classInstanceElementLocations);

// Static Base members and class member keywords allowed
const staticClassLocations = [
    "classElementContainingStatic",
    "classThatStartedWritingIdentifierAfterStaticModifier"
];
verifyClassElementLocations(staticMemberInfo, staticClassLocations);

const classInstanceElementWithoutPublicMethodLocations = [
    "classThatHasAlreadyImplementedAnotherClassMethod",
    "classThatHasAlreadyImplementedAnotherClassMethodAfterMethod",
];
verifyClassElementLocations(instanceWithoutPublicMemberInfo, classInstanceElementWithoutPublicMethodLocations);

const classInstanceElementWithoutProtectedMethodLocations = [
    "classThatHasAlreadyImplementedAnotherClassProtectedMethod",
    "classThatHasDifferentMethodThanBaseAfterProtectedMethod",
];
verifyClassElementLocations(instanceWithoutProtectedMemberInfo, classInstanceElementWithoutProtectedMethodLocations);