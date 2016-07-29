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
    idlType: IDLTypeDescription | null;
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