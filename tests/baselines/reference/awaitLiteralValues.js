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
    yield 'literal';
}
function awaitNumber() {
    yield 1;
}
function awaitTrue() {
    yield true;
}
function awaitFalse() {
    yield false;
}
function awaitNull() {
    yield null;
}
function awaitUndefined() {
    yield undefined;
}
