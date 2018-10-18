///<reference path="fourslash.ts" />

////interface I {
////    methodOfInterface(): number;
////}
////interface I2 {
////    methodOfInterface2(): number;
////}
////interface I3 {
////    getValue(): string;
////    method(): string;
////}
////interface I4 {
////    staticMethod(): void;
////    method(): string;
////}
////class B0 {
////    private privateMethod() { }
////    protected protectedMethod() { }
////    static staticMethod() { }
////    getValue(): string | boolean { return "hello"; }
////    private privateMethod1() { }
////    protected protectedMethod1() { }
////    static staticMethod1() { }
////    getValue1(): string | boolean { return "hello"; }
////}
////interface I5 extends B0 {
////    methodOfInterface5(): number;
////}
////interface I6 extends B0 {
////    methodOfInterface6(): number;
////    staticMethod(): void;
////}
////interface I7 extends I {
////    methodOfInterface7(): number;
////}
////class B {
////    private privateMethod() { }
////    protected protectedMethod() { }
////    static staticMethod() { }
////    getValue(): string | boolean { return "hello"; }
////}
////class C0 implements I, I2 {
////    /*implementsIAndI2*/
////}
////class C00 implements I, I2 {
////    static /*implementsIAndI2AndWritingStatic*/
////}
////class C001 implements I, I2 {
////     methodOfInterface/*implementsIAndI2AndWritingMethodNameOfI*/
////}
////class C extends B implements I, I2 {
////    /*extendsBAndImplementsIAndI2*/
////}
////class C1 extends B implements I, I2 {
////    static /*extendsBAndImplementsIAndI2AndWritingStatic*/
////}
////class D extends B implements I, I2 {
////    /*extendsBAndImplementsIAndI2WithMethodFromB*/
////    protected protectedMethod() {
////        return "protected";
////    }
////}
////class E extends B implements I, I2 {
////    /*extendsBAndImplementsIAndI2WithMethodFromI*/
////    methodOfInterface() {
////        return 1;
////    }
////}
////class F extends B implements I, I2 {
////    /*extendsBAndImplementsIAndI2WithMethodFromBAndI*/
////    protected protectedMethod() {
////        return "protected"
////    }
////    methodOfInterface() {
////        return 1;
////    }
////}
////class F2 extends B implements I, I2 {
////    protected protectedMethod() {
////        return "protected"
////    }
////    methodOfInterface() {
////        return 1;
////    }
////    static /*extendsBAndImplementsIAndI2WithMethodFromBAndIAndTypesStatic*/
////}
////class G extends B implements I3 {
////    /*extendsBAndImplementsI3WithSameNameMembers*/
////}
////class H extends B implements I3 {
////    /*extendsBAndImplementsI3WithSameNameMembersAndHasImplementedTheMember*/
////    getValue() {
////        return "hello";
////    }
////}
////class J extends B0 implements I4 {
////    /*extendsB0ThatExtendsAndImplementsI4WithStaticMethod*/
////}
////class L extends B0 implements I4 {
////    /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethod*/
////    staticMethod2() {
////        return "hello";
////    }
////}
////class K extends B0 implements I4 {
////    /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethod*/
////    staticMethod() {
////        return "hello";
////    }
////}
////class M extends B0 implements I4 {
////    /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStatic*/
////    static staticMethod() {
////        return "hello";
////    }
////}
////class N extends B0 implements I4 {
////    /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBoth*/
////    staticMethod() {
////        return "hello";
////    }
////    static staticMethod() {
////        return "hello";
////    }
////}
////class J1 extends B0 implements I4 {
////    static /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodWritingStatic*/
////}
////class L1 extends B0 implements I4 {
////    staticMethod2() {
////        return "hello";
////    }
////    static /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethodWritingStatic*/
////}
////class K1 extends B0 implements I4 {
////    staticMethod() {
////        return "hello";
////    }
////    static /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodWritingStatic*/
////}
////class M1 extends B0 implements I4 {
////    static staticMethod() {
////        return "hello";
////    }
////    static /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStaticWritingStatic*/
////}
////class N1 extends B0 implements I4 {
////    staticMethod() {
////        return "hello";
////    }
////    static staticMethod() {
////        return "hello";
////    }
////    static /*extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBothWritingStatic*/
////}
////class O implements I7 {
////    /*implementsI7whichExtendsI*/
////}
////class P implements I7, I {
////    /*implementsI7whichExtendsIAndAlsoImplementsI*/
////}
////class Q implements I, I7 {
////    /*implementsIAndAlsoImplementsI7whichExtendsI*/
////}
////class R implements I5 {
////    /*implementsI5ThatExtendsB0*/
////}
////class S implements I6 {
////    /*implementsI6ThatExtendsB0AndHasStaticMethodOfB0*/
////}
////class T extends B0 implements I5 {
////    /*extendsB0AndImplementsI5ThatExtendsB0*/
////}
////class U extends B0 implements I6 {
////    /*extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0*/
////}
////class R1 implements I5 {
////    static /*implementsI5ThatExtendsB0TypesStatic*/
////}
////class S1 implements I6 {
////    static /*implementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic*/
////}
////class T1 extends B0 implements I5 {
////    static /*extendsB0AndImplementsI5ThatExtendsB0TypesStatic*/
////}
////class U1 extends B0 implements I6 {
////    static /*extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic*/
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

const validInstanceMembersOfBaseClassB: CompletionInfo[] = [
    ["getValue", "(method) B.getValue(): string | boolean"],
    ["protectedMethod", "(method) B.protectedMethod(): void"],
];
const validStaticMembersOfBaseClassB: CompletionInfo[] = [
    ["staticMethod", "(method) B.staticMethod(): void"]
];
const privateMembersOfBaseClassB: CompletionInfo[] = [
    ["privateMethod", "(method) B.privateMethod(): void"],
];
const protectedPropertiesOfBaseClassB0: CompletionInfo[] = [
    ["protectedMethod", "(method) B0.protectedMethod(): void"],
    ["protectedMethod1", "(method) B0.protectedMethod1(): void"],
];
const publicPropertiesOfBaseClassB0: CompletionInfo[] = [
    ["getValue", "(method) B0.getValue(): string | boolean"],
    ["getValue1", "(method) B0.getValue1(): string | boolean"],
];
const validInstanceMembersOfBaseClassB0: CompletionInfo[] = protectedPropertiesOfBaseClassB0.concat(publicPropertiesOfBaseClassB0);
const validStaticMembersOfBaseClassB0: CompletionInfo[] = [
    ["staticMethod", "(method) B0.staticMethod(): void"],
    ["staticMethod1", "(method) B0.staticMethod1(): void"]
];
const privateMembersOfBaseClassB0: CompletionInfo[] = [
    ["privateMethod", "(method) B0.privateMethod(): void"],
    ["privateMethod1", "(method) B0.privateMethod1(): void"],
];
const membersOfI: CompletionInfo[] = [
    ["methodOfInterface", "(method) I.methodOfInterface(): number"],
];
const membersOfI2: CompletionInfo[] = [
    ["methodOfInterface2", "(method) I2.methodOfInterface2(): number"],
];
const membersOfI3: CompletionInfo[] = [
    ["getValue", "(method) I3.getValue(): string"],
    ["method", "(method) I3.method(): string"],
];
const membersOfI4: CompletionInfo[] = [
    ["staticMethod", "(method) I4.staticMethod(): void"],
    ["method", "(method) I4.method(): string"],
];
const membersOfI5: CompletionInfo[] = publicPropertiesOfBaseClassB0.concat([
    ["methodOfInterface5", "(method) I5.methodOfInterface5(): number"]
]);
const membersOfI6: CompletionInfo[] = publicPropertiesOfBaseClassB0.concat([
    ["staticMethod", "(method) I6.staticMethod(): void"],
    ["methodOfInterface6", "(method) I6.methodOfInterface6(): number"]
]);
const membersOfI7: CompletionInfo[] = membersOfI.concat([
    ["methodOfInterface7", "(method) I7.methodOfInterface7(): number"]
]);

function getCompletionInfoVerifier(
    validMembers: CompletionInfo[],
    invalidMembers: CompletionInfo[],
    arrayToDistribute: CompletionInfo[],
    isValidDistributionCriteria: (v: CompletionInfo) => boolean): CompletionInfoVerifier {
    if (arrayToDistribute) {
        validMembers = validMembers.concat(arrayToDistribute.filter(isValidDistributionCriteria));
        invalidMembers = invalidMembers.concat(arrayToDistribute.filter(v => !isValidDistributionCriteria(v)));
    }
    return {
        validMembers,
        invalidMembers
    }
}

const noMembers: CompletionInfo[] = [];
const membersOfIAndI2 = membersOfI.concat(membersOfI2);
const invalidMembersOfBAtInstanceLocation = privateMembersOfBaseClassB.concat(validStaticMembersOfBaseClassB);

// members of I and I2
verifyClassElementLocations({ validMembers: membersOfIAndI2, invalidMembers: noMembers }, [
    "implementsIAndI2",
    "implementsIAndI2AndWritingMethodNameOfI"
]);

// Static location so no members of I and I2
verifyClassElementLocations({ validMembers: noMembers, invalidMembers: membersOfIAndI2 },
    ["implementsIAndI2AndWritingStatic"]);

const allInstanceBAndIAndI2 = membersOfIAndI2.concat(validInstanceMembersOfBaseClassB);
// members of instance B, I and I2
verifyClassElementLocations({
    validMembers: allInstanceBAndIAndI2,
    invalidMembers: invalidMembersOfBAtInstanceLocation
}, ["extendsBAndImplementsIAndI2"]);

// static location so only static members of B and no members of instance B, I and I2
verifyClassElementLocations({
    validMembers: validStaticMembersOfBaseClassB,
    invalidMembers: privateMembersOfBaseClassB.concat(allInstanceBAndIAndI2)
}, [
        "extendsBAndImplementsIAndI2AndWritingStatic",
        "extendsBAndImplementsIAndI2WithMethodFromBAndIAndTypesStatic"
    ]);

// instance members of B without protectedMethod, I and I2
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ membersOfIAndI2,
        /*invalidMembers*/ invalidMembersOfBAtInstanceLocation,
        /*arrayToDistribute*/ validInstanceMembersOfBaseClassB,
        value => value[0] !== "protectedMethod"),
    ["extendsBAndImplementsIAndI2WithMethodFromB"]);

// instance members of B, members of T without methodOfInterface and I2
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ membersOfI2.concat(validInstanceMembersOfBaseClassB),
        /*invalidMembers*/ invalidMembersOfBAtInstanceLocation,
        /*arrayToDistribute*/ membersOfI,
        value => value[0] !== "methodOfInterface"),
    ["extendsBAndImplementsIAndI2WithMethodFromI"]);

// instance members of B without protectedMethod, members of T without methodOfInterface and I2
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ membersOfI2,
        /*invalidMembers*/ invalidMembersOfBAtInstanceLocation,
        /*arrayToDistribute*/ membersOfI.concat(validInstanceMembersOfBaseClassB),
        value => value[0] !== "methodOfInterface" && value[0] !== "protectedMethod"),
    ["extendsBAndImplementsIAndI2WithMethodFromBAndI"]);

// members of B and members of I3 that are not same as name of method in B
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ validInstanceMembersOfBaseClassB,
        /*invalidMembers*/ invalidMembersOfBAtInstanceLocation,
        /*arrayToDistribute*/ membersOfI3,
        value => value[0] !== "getValue"),
    ["extendsBAndImplementsI3WithSameNameMembers"]);

// members of B (without getValue since its implemented) and members of I3 that are not same as name of method in B
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ noMembers,
        /*invalidMembers*/ invalidMembersOfBAtInstanceLocation,
        /*arrayToDistribute*/ membersOfI3.concat(validInstanceMembersOfBaseClassB),
        value => value[0] !== "getValue"),
    ["extendsBAndImplementsI3WithSameNameMembersAndHasImplementedTheMember"]);

const invalidMembersOfB0AtInstanceSide = privateMembersOfBaseClassB0.concat(validStaticMembersOfBaseClassB0);
const invalidMembersOfB0AtStaticSide = privateMembersOfBaseClassB0.concat(validInstanceMembersOfBaseClassB0);
// members of B0 and members of I4
verifyClassElementLocations({
    validMembers: validInstanceMembersOfBaseClassB0.concat(membersOfI4),
    invalidMembers: invalidMembersOfB0AtInstanceSide
}, [
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethod",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethod",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStatic"
    ]);

// members of B0 and members of I4 that are not staticMethod
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ validInstanceMembersOfBaseClassB0,
        /*invalidMembers*/ invalidMembersOfB0AtInstanceSide,
        /*arrayToDistribute*/ membersOfI4,
        value => value[0] !== "staticMethod"
    ), [
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethod",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBoth"
    ]);

// static members of B0
verifyClassElementLocations({
    validMembers: validStaticMembersOfBaseClassB0,
    invalidMembers: invalidMembersOfB0AtStaticSide.concat(membersOfI4)
}, [
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodWritingStatic",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethodWritingStatic",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodWritingStatic"
    ]);

// static members of B0 without staticMethod
verifyClassElementLocations(
    getCompletionInfoVerifier(
        /*validMembers*/ noMembers,
        /*invalidMembers*/  invalidMembersOfB0AtStaticSide.concat(membersOfI4),
        /*arrayToDistribute*/ validStaticMembersOfBaseClassB0,
        value => value[0] !== "staticMethod"
    ), [
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStaticWritingStatic",
        "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBothWritingStatic"
    ]);

// members of I7 extends I
verifyClassElementLocations({ validMembers: membersOfI7, invalidMembers: noMembers }, [
    "implementsI7whichExtendsI",
    "implementsI7whichExtendsIAndAlsoImplementsI",
    "implementsIAndAlsoImplementsI7whichExtendsI"
]);

const invalidMembersOfB0AtInstanceSideFromInterfaceExtendingB0 = invalidMembersOfB0AtInstanceSide;
// members of I5 extends B0
verifyClassElementLocations({
    validMembers: membersOfI5.concat(protectedPropertiesOfBaseClassB0),
    invalidMembers: invalidMembersOfB0AtInstanceSideFromInterfaceExtendingB0
}, [
        "implementsI5ThatExtendsB0",
    ]);

// members of I6 extends B0
verifyClassElementLocations({
    validMembers: membersOfI6.concat(protectedPropertiesOfBaseClassB0),
    invalidMembers: invalidMembersOfB0AtInstanceSideFromInterfaceExtendingB0
}, [
        "implementsI6ThatExtendsB0AndHasStaticMethodOfB0",
    ]);

// members of B0 and I5 that extends B0
verifyClassElementLocations({
    validMembers: membersOfI5.concat(protectedPropertiesOfBaseClassB0),
    invalidMembers: invalidMembersOfB0AtInstanceSide
}, [
        "extendsB0AndImplementsI5ThatExtendsB0"
    ]);

// members of B0 and I6 that extends B0
verifyClassElementLocations({
    validMembers: membersOfI6.concat(protectedPropertiesOfBaseClassB0),
    invalidMembers: invalidMembersOfB0AtInstanceSide
}, [
        "extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0"
    ]);

// nothing on static side as these do not extend any other class
verifyClassElementLocations({
    validMembers: [],
    invalidMembers: membersOfI5.concat(membersOfI6, invalidMembersOfB0AtStaticSide)
}, [
        "implementsI5ThatExtendsB0TypesStatic",
        "implementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic"
    ]);

// statics of base B but nothing from instance side
verifyClassElementLocations({
    validMembers: validStaticMembersOfBaseClassB0,
    invalidMembers: membersOfI5.concat(membersOfI6, invalidMembersOfB0AtStaticSide)
}, [
        "extendsB0AndImplementsI5ThatExtendsB0TypesStatic",
        "extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic"
    ]);