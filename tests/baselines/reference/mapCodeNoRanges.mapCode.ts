// === mapCode ===

// === ORIGINAL ===
function foo() {
    return 1;
}
function bar() {
    return 2;
}

// === INCOMING CHANGES ===

function baz() {
    return 3;
}

// === MAPPED ===
function foo() {
    return 1;
}
function bar() {
    return 2;
}

function baz() {
    return 3;
}
