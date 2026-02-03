//// [tests/cases/compiler/nestedBlockScopedBindings3.ts] ////

//// [nestedBlockScopedBindings3.ts]
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

//// [nestedBlockScopedBindings3.js]
function a0() {
    {
        var _loop_1 = function (x) {
            (function () { return x; });
        };
        for (var x = 0; x < 1;) {
            _loop_1(x);
        }
    }
    {
        var _loop_2 = function (x) {
            (function () { return x; });
        };
        for (var x = void 0;;) {
            _loop_2(x);
        }
    }
}
function a1() {
    var _loop_3 = function (x) {
        (function () { return x; });
    };
    for (var x = void 0; x < 1;) {
        _loop_3(x);
    }
    var _loop_4 = function (x) {
        (function () { return x; });
    };
    for (var x = void 0;;) {
        _loop_4(x);
    }
}
function a2() {
    for (var x = void 0; x < 1;) {
        x = x + 1;
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a3() {
    for (var x = void 0; x < 1;) {
        x = x + 1;
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
function a4() {
    var _loop_5 = function (x) {
        x = x + 1;
        (function () { return x; });
        out_x_1 = x;
    };
    var out_x_1;
    for (var x = void 0; x < 1;) {
        _loop_5(x);
        x = out_x_1;
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
function a5() {
    var _loop_6 = function (x) {
        x = x + 1;
        (function () { return x; });
        out_x_2 = x;
    };
    var out_x_2;
    for (var x = void 0; x < 1;) {
        _loop_6(x);
        x = out_x_2;
    }
    switch (1) {
        case 1:
            var x_1;
            (function () { return x_1; });
            break;
    }
}
