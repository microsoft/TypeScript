// === mapCode ===

// === ORIGINAL ===
function foo() {
    return 1;
}[||]
function bar() {
    return 2;
}
// === INCOMING CHANGES ===

baz() {
    return 3;
}

// === MAPPED ===
function foo() {
    return 1;
}
function bar() {
    return 2;
}