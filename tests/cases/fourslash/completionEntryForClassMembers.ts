///<reference path="fourslash.ts" />

// @noLib: true

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
////class D3 extends D1 {
////    /*classThatExtendsClassExtendingAnotherClass*/
////}
////class D4 extends D1 {
////    static /*classThatExtendsClassExtendingAnotherClassAndTypesStatic*/
////}
////class D5 extends D2 {
////    /*classThatExtendsClassExtendingAnotherClassWithOverridingMember*/
////}
////class D6 extends D2 {
////    static /*classThatExtendsClassExtendingAnotherClassWithOverridingMemberAndTypesStatic*/
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
////class O extends B {
////    constructor(public a) {
////    },
////    /*classElementAfterConstructorSeparatedByComma*/
////}

const getValue: FourSlashInterface.ExpectedCompletionEntry = { name: "getValue", text: "(method) B.getValue(): number" };
const protectedMethod: FourSlashInterface.ExpectedCompletionEntry = { name: "protectedMethod", text: "(method) B.protectedMethod(): void" };
const staticMethod: FourSlashInterface.ExpectedCompletionEntry = { name: "staticMethod", text: "(method) B.staticMethod(): void" };

verify.completions(
    {
        // Not a class element declaration location
        marker: "InsideMethod",
        unsorted: [
            "arguments",
            completion.globalThisEntry,
            "B", "C", "D", "D1", "D2", "D3", "D4", "D5", "D6", "E", "F", "F2", "G", "G2", "H", "I", "J", "K", "L", "L2", "M", "N", "O",
            completion.undefinedVarEntry,
            ...completion.insideMethodKeywords,
        ],
    },
    {
        // Only keywords allowed at this position since they dont extend the class or are private
        marker: [
            "abstractClass",
            "classThatDoesNotExtendAnotherClass",
            "classThatHasWrittenPrivateKeyword",
            "classElementContainingPrivateStatic",
            "classThatStartedWritingIdentifierAfterPrivateModifier",
            "classThatStartedWritingIdentifierAfterPrivateStaticModifier",
        ],
        unsorted: completion.classElementKeywords,
        isNewIdentifierLocation: true,
    },
    {
        // Instance base members and class member keywords allowed
        marker:[
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
            "classThatHasWrittenAsyncKeyword",
            "classElementAfterConstructorSeparatedByComma",
        ],
        unsorted: [protectedMethod, getValue, ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        // Static Base members and class member keywords allowed
        marker: ["classElementContainingStatic", "classThatStartedWritingIdentifierAfterStaticModifier"],
        unsorted: [staticMethod, ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        marker: [
            "classThatHasAlreadyImplementedAnotherClassMethod",
            "classThatHasAlreadyImplementedAnotherClassMethodAfterMethod",
        ],
        unsorted: [protectedMethod, ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        marker: [
            "classThatHasAlreadyImplementedAnotherClassProtectedMethod",
            "classThatHasDifferentMethodThanBaseAfterProtectedMethod",
        ],
        unsorted: [getValue, ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        // instance memebers in D1 and base class are shown
        marker: "classThatExtendsClassExtendingAnotherClass",
        unsorted: ["getValue1", "protectedMethod", "getValue", ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        // instance memebers in D2 and base class are shown
        marker: "classThatExtendsClassExtendingAnotherClassWithOverridingMember",
        unsorted: [
            { name: "protectedMethod", text: "(method) D2.protectedMethod(): void" },
            getValue,
            ...completion.classElementKeywords,
        ],
        isNewIdentifierLocation: true,
    },
    {
        // static base members and class member keywords allowed
        marker: [
            "classThatExtendsClassExtendingAnotherClassAndTypesStatic",
            "classThatExtendsClassExtendingAnotherClassWithOverridingMemberAndTypesStatic"
        ],
        unsorted: [staticMethod, ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
);
