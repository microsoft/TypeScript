// @strictNullChecks: true

// Repro from #9977

type IDLMemberTypes = OperationMemberType | ConstantMemberType;

interface IDLTypeDescription {
    origin: string;
}

interface InterfaceType {
    members: IDLMemberTypes[];
}

interface OperationMemberType {
    type: "operation";
    idlType: IDLTypeDescription;
}

interface ConstantMemberType {
    type: "const";
    idlType: string;
}

function insertInterface(callbackType: InterfaceType) {
    for (const memberType of callbackType.members) {
        if (memberType.type === "const") {
            memberType.idlType;  // string
        }
        else if (memberType.type === "operation") {
            memberType.idlType.origin;  // string
            (memberType.idlType as IDLTypeDescription);
        }
    }
}

function insertInterface2(callbackType: InterfaceType) {
    for (const memberType of callbackType.members) {
        if (memberType.type === "operation") {
            memberType.idlType.origin;  // string
        }
    }
}

function foo(memberType: IDLMemberTypes) {
    if (memberType.type === "const") {
        memberType.idlType;  // string
    }
    else if (memberType.type === "operation") {
        memberType.idlType.origin;  // string
    }
}

// Repro for issue similar to #8383

interface A {
    kind: true;
    prop: { a: string; };
}

interface B {
    kind: false;
    prop: { b: string; }
}

function f1(x: A | B) {
    while (true) {
        x.prop;
        if (x.kind === true) {
            x.prop.a;
        }
        if (x.kind === false) {
            x.prop.b;
        }
    }
}

function f2(x: A | B) {
    while (true) {
        if (x.kind) {
            x.prop.a;
        }
        if (!x.kind) {
            x.prop.b;
        }
    }
}