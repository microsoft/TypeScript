// === mapCode ===

// === ORIGINAL ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    myLabel: if (x === y) [||]{
        console.log("hello");
        console.log("you");
        break myLabel;
    }
    return 1;
}

// === INCOMING CHANGES ===

myLabel: if (y === x) {
  console.log("goodbye");
  console.log("world");
  break myLabel;
}

// === MAPPED ===
function foo() {
    const x: number = 1;
    const y: number = 2;
    myLabel: if (y === x) {
        console.log("goodbye");
        console.log("world");
        break myLabel;
    }
    return 1;
}
