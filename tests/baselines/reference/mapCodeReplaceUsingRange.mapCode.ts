// === mapCode ===

// === ORIGINAL ===
[|function foo() {
    return 1;
}[||]
function bar() {
    return [|2;|]
}|]

// === INCOMING CHANGES ===

function foo() {
    return 3;
}

// === MAPPED ===
function foo() {
    return 3;
}
function bar() {
    return 2;
}
