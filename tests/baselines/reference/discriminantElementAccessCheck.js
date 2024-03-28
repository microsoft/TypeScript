//// [tests/cases/compiler/discriminantElementAccessCheck.ts] ////

//// [discriminantElementAccessCheck.ts]
type U = TypeA | TypeB;

interface TypeA {
    kind: 'A';
    a: number;
}
interface TypeB {
    kind: 'B';
    b: string;
}

function assertNever(x: never) {
    return x;
}

function IfWithString(val: U) {
    if (val['kind'] === 'B') {
        return val.b;
    } else {
        return val.a;
    }
}

function SwitchWithString(val: U) {
    switch (val['kind']) {
        case 'A':
            return val.a;
        case 'B':
            return val.b;
        default:
            return assertNever(val);
    }
}

function IfWithTemplate(val: U) {
    if (val[`kind`] === 'B') {
        return val.b;
    } else {
        return val.a;
    }
}

function SwitchWithTemplate(val: U) {
    switch (val[`kind`]) {
        case 'A':
            return val.a;
        case 'B':
            return val.b;
        default:
            return assertNever(val);
    }
}

//// [discriminantElementAccessCheck.js]
function assertNever(x) {
    return x;
}
function IfWithString(val) {
    if (val['kind'] === 'B') {
        return val.b;
    }
    else {
        return val.a;
    }
}
function SwitchWithString(val) {
    switch (val['kind']) {
        case 'A':
            return val.a;
        case 'B':
            return val.b;
        default:
            return assertNever(val);
    }
}
function IfWithTemplate(val) {
    if (val["kind"] === 'B') {
        return val.b;
    }
    else {
        return val.a;
    }
}
function SwitchWithTemplate(val) {
    switch (val["kind"]) {
        case 'A':
            return val.a;
        case 'B':
            return val.b;
        default:
            return assertNever(val);
    }
}
