//// [tests/cases/compiler/nestedBlockScopedBindings5.ts] ////

//// [nestedBlockScopedBindings5.ts]
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

//// [nestedBlockScopedBindings5.js]
function a0() {
    for (var x in []) {
        x = x + 1;
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a1() {
    var _loop_1 = function (x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var x in []) {
        _loop_1(x);
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a2() {
    for (var x in []) {
        x = x + 1;
    }
    var _loop_2 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_1 = x;
    };
    var out_x_1;
    for (var x = void 0;;) {
        _loop_2(x);
        x = out_x_1;
    }
}
function a3() {
    var _loop_3 = function (x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var x in []) {
        _loop_3(x);
    }
    var _loop_4 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_2 = x;
    };
    var out_x_2;
    for (var x = void 0; false;) {
        _loop_4(x);
        x = out_x_2;
    }
    switch (1) {
        case 1:
            var x_1;
            (function () { return x_1; });
            break;
    }
}
function a4() {
    for (var x in []) {
        x = x + 1;
    }
    for (var x = void 0; false;) {
        x = x + 2;
    }
    switch (1) {
        case 1:
            var x_2;
            (function () { return x_2; });
            break;
    }
}
function a5() {
    var y;
    for (var x in []) {
        x = x + 1;
    }
    var _loop_5 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_3 = x;
    };
    var out_x_3;
    for (var x = void 0; false;) {
        _loop_5(x);
        x = out_x_3;
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
