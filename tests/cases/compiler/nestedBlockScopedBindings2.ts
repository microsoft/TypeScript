function a0() {
    {
        let x = 1;
        () => x;
    }
    {
        let x = 1;
    }
}

function a1() {
    {
        let x;
    }
    {
        let x = 1;
        () => x;
    }
}

function a2() {
    {
        let x = 1;
        () => x;
    }
    {
        let x;
        () => x;
    }
}


function a3() {
    {
        let x = 1;
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
    {
        let x;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
}


function a5() {
    {
        let x;
        () => x;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}

function a6() {
    switch (1) {
        case 1:
            let x;
            break;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}

function a7() {
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}

function a8() {
    switch (1) {
        case 1:
            let x;
            break;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
}

function a9() {
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
    switch (1) {
        case 1:
            let x;
            () => x;
            break;
    }
}
