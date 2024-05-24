// === mapCode ===

// === ORIGINAL ===
function foo() {
    for (let x = 0; x < 10; x++) [||]{
        console.log("hello");
        console.log("you");
    }
    return 1;
}

// === INCOMING CHANGES ===

for (let x = 0; x < 10; x++) {
  console.log("goodbye");
  console.log("world");
}

// === MAPPED ===
function foo() {
    for (let x = 0; x < 10; x++) {
        console.log("goodbye");
        console.log("world");
    }
    return 1;
}
