//// [tests/cases/conformance/controlFlow/controlFlowOptionalChain2.ts] ////

//// [controlFlowOptionalChain2.ts]
type A = {
  type: 'A';
  name: string;
}

type B = {
  type: 'B';
}

function funcTwo(arg: A | B | undefined) {
  if (arg?.type === 'B') {
    arg; // `B`
    return;
  }

  arg;
  arg?.name;
}

function funcThree(arg: A | B | null) {
  if (arg?.type === 'B') {
    arg; // `B`
    return;
  }

  arg;
  arg?.name;
}

type U = { kind: undefined, u: 'u' }
type N = { kind: null, n: 'n' }
type X = { kind: 'X', x: 'x' }

function f1(x: X | U | undefined) {
    if (x?.kind === undefined) {
        x; // U | undefined
    }
    else {
        x; // X
    }
}

function f2(x: X | N | undefined) {
    if (x?.kind === undefined) {
        x; // undefined
    }
    else {
        x; // X | N
    }
}

function f3(x: X | U | null) {
    if (x?.kind === undefined) {
        x; // U | null
    }
    else {
        x; // X
    }
}

function f4(x: X | N | null) {
    if (x?.kind === undefined) {
        x; // null
    }
    else {
        x; // X | N
    }
}

function f5(x: X | U | undefined) {
    if (x?.kind === null) {
        x; // never
    }
    else {
        x; // X | U | undefined
    }
}

function f6(x: X | N | undefined) {
    if (x?.kind === null) {
        x; // N
    }
    else {
        x; // X | undefined
    }
}

function f7(x: X | U | null) {
    if (x?.kind === null) {
        x; // never
    }
    else {
        x; // X | U | null
    }
}

function f8(x: X | N | null) {
    if (x?.kind === null) {
        x; // N
    }
    else {
        x; // X | null
    }
}


//// [controlFlowOptionalChain2.js]
function funcTwo(arg) {
    if (arg?.type === 'B') {
        arg;
        return;
    }
    arg;
    arg?.name;
}
function funcThree(arg) {
    if (arg?.type === 'B') {
        arg;
        return;
    }
    arg;
    arg?.name;
}
function f1(x) {
    if (x?.kind === undefined) {
        x;
    }
    else {
        x;
    }
}
function f2(x) {
    if (x?.kind === undefined) {
        x;
    }
    else {
        x;
    }
}
function f3(x) {
    if (x?.kind === undefined) {
        x;
    }
    else {
        x;
    }
}
function f4(x) {
    if (x?.kind === undefined) {
        x;
    }
    else {
        x;
    }
}
function f5(x) {
    if (x?.kind === null) {
        x;
    }
    else {
        x;
    }
}
function f6(x) {
    if (x?.kind === null) {
        x;
    }
    else {
        x;
    }
}
function f7(x) {
    if (x?.kind === null) {
        x;
    }
    else {
        x;
    }
}
function f8(x) {
    if (x?.kind === null) {
        x;
    }
    else {
        x;
    }
}
