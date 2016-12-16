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
    for (var x = void 0; x < 1;) {
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
        out_x_1 = x;
    };
    var out_x_1;
    for (var x = void 0; x < 1;) {
        _loop_1(x);
        x = out_x_1;
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a2() {
    for (var x = void 0; x < 1;) {
        x = x + 1;
    }
    var _loop_2 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_2 = x;
    };
    var out_x_2;
    for (var x = void 0;;) {
        _loop_2(x);
        x = out_x_2;
    }
}
function a3() {
    var _loop_3 = function (x) {
        x = x + 1;
        (function () { return x; });
        out_x_3 = x;
    };
    var out_x_3;
    for (var x = void 0; x < 1;) {
        _loop_3(x);
        x = out_x_3;
    }
    var _loop_4 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_4 = x;
    };
    var out_x_4;
    for (var x = void 0;;) {
        _loop_4(x);
        x = out_x_4;
    }
}
