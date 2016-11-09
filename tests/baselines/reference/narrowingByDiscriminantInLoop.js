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

//// [narrowingByDiscriminantInLoop.js]
// Repro from #9977
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
function insertInterface(callbackType) {
    try {
        for (var iterator_1 = { iterator: __values(callbackType.members) }; __step(iterator_1);) {
            var memberType = iterator_1.result.value;
            if (memberType.type === "const") {
                memberType.idlType; // string
            }
            else if (memberType.type === "operation") {
                memberType.idlType.origin; // string
                memberType.idlType;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
    }
    var e_1;
}
function insertInterface2(callbackType) {
    try {
        for (var iterator_2 = { iterator: __values(callbackType.members) }; __step(iterator_2);) {
            var memberType = iterator_2.result.value;
            if (memberType.type === "operation") {
                memberType.idlType.origin; // string
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try { __close(iterator_2); } finally { if (e_2) throw e_2.error; }
    }
    var e_2;
}
function foo(memberType) {
    if (memberType.type === "const") {
        memberType.idlType; // string
    }
    else if (memberType.type === "operation") {
        memberType.idlType.origin; // string
    }
}
function f1(x) {
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
function f2(x) {
    while (true) {
        if (x.kind) {
            x.prop.a;
        }
        if (!x.kind) {
            x.prop.b;
        }
    }
}
