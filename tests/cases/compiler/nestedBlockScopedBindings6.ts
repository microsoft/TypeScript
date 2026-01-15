function a0() {
    for (let x of [1]) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a1() {
    for (let x of [1]) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a2() {
    for (let x of [1]) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}

function a3() {
    for (let x of [1]) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}

function a4() {
    for (let x of [1]) {
        x = x + 1;
        () => x;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}


function a5() {
    for (let x of [1]) {
        x = x + 1;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
}

function a6() {
    for (let x of [1]) {
        x = x + 1;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}

function a7() {
    for (let x of [1]) {
        x = x + 1;
        () => x;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
}