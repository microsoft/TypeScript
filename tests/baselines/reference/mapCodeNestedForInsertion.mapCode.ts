// === mapCode ===

// === ORIGINAL ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    for (let i = 0; i < 10; i++) [||]{
        console.log("hello");
        console.log("you");
    }
    return 1;
}

// === INCOMING CHANGES ===

for (let j = 0; j < 10; j++) {
  console.log("goodbye");
  console.log("world");
}

// === MAPPED ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    for (let i = 0; i < 10; i++) {
        console.log("hello");
        console.log("you");
        for (let j = 0; j < 10; j++) {
            console.log("goodbye");
            console.log("world");
        }
    }
    return 1;
}
