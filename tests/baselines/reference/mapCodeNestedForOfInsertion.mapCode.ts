// === mapCode ===

// === ORIGINAL ===
function foo() {
    for (const x of [1, 2, 3])[||] {
        console.log("hello");
        console.log("you");
    }
    return 1;
}

// === INCOMING CHANGES ===

for (const y of [1, 2, 3]) {
  console.log("goodbye");
  console.log("world");
}

// === MAPPED ===
function foo() {
    for (const x of [1, 2, 3]) {
        console.log("hello");
        console.log("you");
        for (const y of [1, 2, 3]) {
            console.log("goodbye");
            console.log("world");
        }
    }
    return 1;
}
