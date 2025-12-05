// === mapCode ===

// === ORIGINAL ===

[|function foo() {
    const x: number = 1;
    const y: number = 2;
    if (x === y) [||]{
        console.log("hello");
        console.log("you");
    }
    return 1;
}|]

function bar() {
    [|return 2|];
}

// === INCOMING CHANGES ===

if (x === y) {
  console.log("goodbye");
  console.log("world");
}

// ---

function bar() {
    return 3;
}

// ---

method() {
    return 'nope';
}

// === MAPPED ===

function foo() {
    const x: number = 1;
    const y: number = 2;
    if (x === y) {
        console.log("goodbye");
        console.log("world");
    }
    return 1;
}

function bar() {
    return 3;
}
