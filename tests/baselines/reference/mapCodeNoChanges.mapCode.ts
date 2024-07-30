// === mapCode ===

// === ORIGINAL ===
function foo() {
    return 1;
}
[||]
function bar() {
    return 2;
}
function baz() {
    return 3;
}

// === INCOMING CHANGES ===

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
