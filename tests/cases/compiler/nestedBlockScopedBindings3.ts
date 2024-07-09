function a0() {
    {
        for (let x = 0; x < 1; ) {
            () => x;
        }
    }
    {
        for (let x;;) {
            () => x;
        }
    }
}

function a1() {
    for (let x; x < 1;) {
        () => x;
    }
    for (let x;;) {
        () => x;
    }
}

function a2() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
    }
}


function a3() {
    for (let x; x < 1;) {
        x = x + 1;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}

function a4() {
    for (let x; x < 1;) {
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
    for (let x; x < 1;) {
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