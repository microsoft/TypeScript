//// [tests/cases/compiler/nestedBlockScopedBindings4.ts] ////

//// [nestedBlockScopedBindings4.ts]
function a0() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a1() {
    for (let x; x < 1;) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a2() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}


function a3() {
    for (let x; x < 1;) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}

//// [nestedBlockScopedBindings4.js]
function a0() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
    }
}
function a1() {
    for (let x; x < 1;) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
    }
}
function a2() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}
function a3() {
    for (let x; x < 1;) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}
