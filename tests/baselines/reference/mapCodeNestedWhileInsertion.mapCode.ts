// === mapCode ===

// === ORIGINAL ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    while (x === y) [||]{
        console.log("hello");
        console.log("you");
    }
    return 1;
}

// === INCOMING CHANGES ===

while (y === x) {
  console.log("goodbye");
  console.log("world");
}

// === MAPPED ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    while (x === y) {
        console.log("hello");
        console.log("you");
        while (y === x) {
            console.log("goodbye");
            console.log("world");
        }
    }
    return 1;
}
