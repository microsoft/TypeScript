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

const validInstanceMembersOfBaseClassB: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "protectedMethod", text: "(method) B.protectedMethod(): void", kindModifiers: "protected" },
    { name: "getValue", text: "(method) B.getValue(): string | boolean" },
];
const validStaticMembersOfBaseClassB: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "staticMethod", text: "(method) B.staticMethod(): void", kindModifiers: "static" },
];
const privateMembersOfBaseClassB: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "privateMethod", text: "(method) B.privateMethod(): void" },
];
const protectedPropertiesOfBaseClassB0: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "protectedMethod", text: "(method) B0.protectedMethod(): void", kindModifiers: "protected" },
    { name: "protectedMethod1", text: "(method) B0.protectedMethod1(): void", kindModifiers: "protected" },
];
const publicPropertiesOfBaseClassB0: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "getValue", text: "(method) B0.getValue(): string | boolean" },
    { name: "getValue1", text: "(method) B0.getValue1(): string | boolean" },
];
const validInstanceMembersOfBaseClassB0: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = protectedPropertiesOfBaseClassB0.concat(publicPropertiesOfBaseClassB0);
const validInstanceMembersOfBaseClassB0_2 : ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    protectedPropertiesOfBaseClassB0[0],
    publicPropertiesOfBaseClassB0[0],
    protectedPropertiesOfBaseClassB0[1],
    publicPropertiesOfBaseClassB0[1],
];
const validStaticMembersOfBaseClassB0: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "staticMethod", text: "(method) B0.staticMethod(): void", kindModifiers: "static" },
    { name: "staticMethod1", text: "(method) B0.staticMethod1(): void", kindModifiers: "static" },
];
const privateMembersOfBaseClassB0: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "privateMethod", text: "(method) B0.privateMethod(): void", kindModifiers: "private" },
    { name: "privateMethod1", text: "(method) B0.privateMethod1(): void", kindModifiers: "private" },
];
const membersOfI: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "methodOfInterface", text: "(method) I.methodOfInterface(): number" },
];
const membersOfI2: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "methodOfInterface2", text: "(method) I2.methodOfInterface2(): number" },
];
const membersOfI3: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "getValue", text: "(method) I3.getValue(): string" },
    { name: "method", text: "(method) I3.method(): string" },
];
const membersOfI4: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "staticMethod", text: "(method) I4.staticMethod(): void" },
    { name: "method", text: "(method) I4.method(): string" },
];
const membersOfI5: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = publicPropertiesOfBaseClassB0.concat([
    { name: "methodOfInterface5", text: "(method) I5.methodOfInterface5(): number" },
]);
const membersOfJustI5: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "methodOfInterface5", text: "(method) I5.methodOfInterface5(): number" },
];
const membersOfI6: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = publicPropertiesOfBaseClassB0.concat([
    { name: "staticMethod", text: "(method) I6.staticMethod(): void" },
    { name: "methodOfInterface6", text: "(method) I6.methodOfInterface6(): number" },
]);
const membersOfI7: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    { name: "methodOfInterface7", text: "(method) I7.methodOfInterface7(): number" },
    ...membersOfI,
];
const membersOfI7_2: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
    ...membersOfI,
    { name: "methodOfInterface7", text: "(method) I7.methodOfInterface7(): number" },
];

const noMembers: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [];
const membersOfIAndI2 = [...membersOfI, ...membersOfI2];
const invalidMembersOfBAtInstanceLocation = privateMembersOfBaseClassB.concat(validStaticMembersOfBaseClassB);


const allInstanceBAndIAndI2 = [...validInstanceMembersOfBaseClassB, ...membersOfIAndI2];

const invalidMembersOfB0AtInstanceSide = [...privateMembersOfBaseClassB0, ...validStaticMembersOfBaseClassB0];
const invalidMembersOfB0AtStaticSide = [...privateMembersOfBaseClassB0, validInstanceMembersOfBaseClassB0];

const invalidMembersOfB0AtInstanceSideFromInterfaceExtendingB0 = invalidMembersOfB0AtInstanceSide;

const tests: ReadonlyArray<{ readonly marker: string | ReadonlyArray<string>, readonly members: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> }> = [
    // members of I and I2
    { marker: ["implementsIAndI2", "implementsIAndI2AndWritingMethodNameOfI"], members: membersOfIAndI2 },
    // Static location so no members of I and I2
    { marker: "implementsIAndI2AndWritingStatic", members: [] },
    // members of instance B, I and I2
    { marker: "extendsBAndImplementsIAndI2", members: allInstanceBAndIAndI2 },
    // static location so only static members of B and no members of instance B, I and I2
    {
        marker: [
            "extendsBAndImplementsIAndI2AndWritingStatic",
            "extendsBAndImplementsIAndI2WithMethodFromBAndIAndTypesStatic"
        ],
        members: validStaticMembersOfBaseClassB,
    },
    // instance members of B without protectedMethod, I and I2
    { marker: "extendsBAndImplementsIAndI2WithMethodFromB",members: [validInstanceMembersOfBaseClassB[1], ...membersOfIAndI2] }, //TODO:NEATER
    // instance members of B, members of T without methodOfInterface and I2
    { marker: "extendsBAndImplementsIAndI2WithMethodFromI", members: [...validInstanceMembersOfBaseClassB, ...membersOfI2] },
    // instance members of B without protectedMethod, members of T without methodOfInterface and I2
    { marker: "extendsBAndImplementsIAndI2WithMethodFromBAndI", members: [validInstanceMembersOfBaseClassB[1], ...membersOfI2] },
    // members of B and members of I3 that are not same as name of method in B
    { marker: "extendsBAndImplementsI3WithSameNameMembers", members: [...validInstanceMembersOfBaseClassB, membersOfI3[1]] }, //TODO:NEATER
    // members of B (without getValue since its implemented) and members of I3 that are not same as name of method in B
    { marker: "extendsBAndImplementsI3WithSameNameMembersAndHasImplementedTheMember", members: [validInstanceMembersOfBaseClassB[0], membersOfI3[1]] }, //TODO:NEATER
    // members of B0 and members of I4
    {
        marker: [
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethod",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethod",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStatic",
        ],
        members: [...validInstanceMembersOfBaseClassB0_2, ...membersOfI4],
    },
    // members of B0 and members of I4 that are not staticMethod
    {
        marker: [
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethod",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBoth",
        ],
        members: [...validInstanceMembersOfBaseClassB0_2, membersOfI4[1]], //TODO:NEATER
    },
    // static members of B0
    {
        marker: [
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodWritingStatic",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedAnotherMethodWritingStatic",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodWritingStatic",
        ],
        members: validStaticMembersOfBaseClassB0,
    },
    // static members of B0 without staticMethod
    {
        marker: [
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsStaticWritingStatic",
            "extendsB0ThatExtendsAndImplementsI4WithStaticMethodAndImplementedThatMethodAsBothWritingStatic",
        ],
        members: [validStaticMembersOfBaseClassB0[1]] // TODO:NEATER
    },
    // members of I7 extends I
    {
        marker: [
            "implementsI7whichExtendsI",
            "implementsI7whichExtendsIAndAlsoImplementsI",
        ],
        members: membersOfI7,
    },
    {
        marker: "implementsIAndAlsoImplementsI7whichExtendsI",
        members: membersOfI7_2,
    },
    // members of I5 extends B0
    {
        marker: "implementsI5ThatExtendsB0",
        members: [...membersOfJustI5, protectedPropertiesOfBaseClassB0[0], publicPropertiesOfBaseClassB0[0], protectedPropertiesOfBaseClassB0[1], publicPropertiesOfBaseClassB0[1]], //TODO:NEATER
    },
    // members of I6 extends B0
    {
        marker: "implementsI6ThatExtendsB0AndHasStaticMethodOfB0",
        //TODO:NEATER
        members:[
            membersOfI6[3],
            membersOfI6[2],
            protectedPropertiesOfBaseClassB0[0],
            membersOfI6[0],
            protectedPropertiesOfBaseClassB0[1],
            membersOfI6[1],
        ],
    },
    // members of B0 and I5 that extends B0
    {
        marker: "extendsB0AndImplementsI5ThatExtendsB0",
        members: [
            protectedPropertiesOfBaseClassB0[0],
            membersOfI5[0],
            protectedPropertiesOfBaseClassB0[1],
            membersOfI5[1],
            membersOfI5[2],
        ],
    },
    // members of B0 and I6 that extends B0
    {
        marker: "extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0",
        members: [
            protectedPropertiesOfBaseClassB0[0],
            membersOfI6[0],
            protectedPropertiesOfBaseClassB0[1],
            membersOfI6[1],
            membersOfI6[3],
            membersOfI6[2],
        ],
    },
    // nothing on static side as these do not extend any other class
    {
        marker: [
            "implementsI5ThatExtendsB0TypesStatic",
            "implementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic",
        ],
        members: [],
    },
    {
        marker: [
            "extendsB0AndImplementsI5ThatExtendsB0TypesStatic",
            "extendsB0AndImplementsI6ThatExtendsB0AndHasStaticMethodOfB0TypesStatic",
        ],
        // statics of base B but nothing from instance side
        members: validStaticMembersOfBaseClassB0,
    },
];

verify.completions(...tests.map(({ marker, members }): FourSlashInterface.CompletionsOptions => ({
    marker,
    unsorted: [...members.map(m => ({ ...m, kind: "method" })), ...completion.classElementKeywords],
    isNewIdentifierLocation: true,
})));
