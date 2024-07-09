function a0() {
    for (let x in []) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a1() {
    for (let x in []) {
        x = x + 1;
        () => x;
    }
    for (let x;;) {
        x = x + 2;
    }
}

function a2() {
    for (let x in []) {
        x = x + 1;
    }
    for (let x;;) {
        x = x + 2;
        () => x;
    }
}


function a3() {
    for (let x in []) {
        x = x + 1;
        () => x;
    }
    for (let x;false;) {
        x = x + 2;
        () => x;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
    
}

function a4() {
    for (let x in []) {
        x = x + 1;
    }
    for (let x;false;) {
        x = x + 2;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
    
}

function a5() {
    let y;
    for (let x in []) {
        x = x + 1;
    }
    for (let x;false;) {
        x = x + 2;
        () => x;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
    
}