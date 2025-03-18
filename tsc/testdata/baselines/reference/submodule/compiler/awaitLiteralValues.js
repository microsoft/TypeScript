//// [tests/cases/compiler/awaitLiteralValues.ts] ////

//// [awaitLiteralValues.ts]
function awaitString() {
    await 'literal';
}

function awaitNumber() {
    await 1;
}

function awaitTrue() {
    await true;
}

function awaitFalse() {
    await false;
}

function awaitNull() {
    await null;
}

function awaitUndefined() {
    await undefined;
}


//// [awaitLiteralValues.js]
function awaitString() {
    await 'literal';
}
function awaitNumber() {
    await 1;
}
function awaitTrue() {
    await true;
}
function awaitFalse() {
    await false;
}
function awaitNull() {
    await null;
}
function awaitUndefined() {
    await undefined;
}
