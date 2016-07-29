//// [narrowingByDiscriminantInLoop.ts]
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

//// [narrowingByDiscriminantInLoop.js]
// Repro from #9977
function insertInterface(callbackType) {
    for (var _i = 0, _a = callbackType.members; _i < _a.length; _i++) {
        var memberType = _a[_i];
        if (memberType.type === "const") {
            memberType.idlType; // string
        }
        else if (memberType.type === "operation") {
            memberType.idlType.origin; // string
            memberType.idlType;
        }
    }
}
function insertInterface2(callbackType) {
    for (var _i = 0, _a = callbackType.members; _i < _a.length; _i++) {
        var memberType = _a[_i];
        if (memberType.type === "operation") {
            memberType.idlType.origin; // string
        }
    }
}
function foo(memberType) {
    if (memberType.type === "const") {
        memberType.idlType; // string
    }
    else if (memberType.type === "operation") {
        memberType.idlType.origin; // string
    }
}
