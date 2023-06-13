//// [tests/cases/compiler/nestedBlockScopedBindings1.ts] ////

//// [nestedBlockScopedBindings1.ts]
function a0() {
    {
        let x = 1;
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
    }
}

function a2() {
    {
        let x = 1;
    }
    {
        let x;
    }
}

function a3() {
    {
        let x = 1;
    }
    switch (1) {
        case 1:
            let x;
            break;
    }
}


function a4() {
    {
        let x;
    }
    switch (1) {
        case 1:
            let x = 1;
            break;
    }
}


//// [nestedBlockScopedBindings1.js]
function a0() {
    {
        var x = 1;
    }
    {
        var x = 1;
    }
}
function a1() {
    {
        var x = void 0;
    }
    {
        var x = 1;
    }
}
function a2() {
    {
        var x = 1;
    }
    {
        var x = void 0;
    }
}
function a3() {
    {
        var x = 1;
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
function a4() {
    {
        var x = void 0;
    }
    switch (1) {
        case 1:
            var x = 1;
            break;
    }
}
