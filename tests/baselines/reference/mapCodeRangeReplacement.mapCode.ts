// === mapCode ===

// === ORIGINAL ===
function foo() {
    return 1;
}
if (foo == bar) {
    console.log("hello");
    console.log("you");
}
[||]
function bar() {
    return 2;
}
function baz() {
    return 3;
}
while (false) {
    console.log("weee");
}

// === INCOMING CHANGES ===

if (foo == bar) {
    console.log("huh");
}

function baz() {
    return 'baz';
}

// === MAPPED ===
function foo() {
    return 1;
}
if (foo == bar) {
    console.log("huh");
}
function baz() {
    return "baz";
}
while (false) {
    console.log("weee");
}
