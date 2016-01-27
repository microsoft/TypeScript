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
    var _loop_1 = function(x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var x = void 0; x < 1;) {
        _loop_1(x);
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a2() {
    for (var x = void 0; x < 1;) {
        x = x + 1;
    }
    var _loop_2 = function(x) {
        x = x + 2;
        (function () { return x; });
    };
    for (var x = void 0;;) {
        _loop_2(x);
    }
}
function a3() {
    var _loop_3 = function(x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var x = void 0; x < 1;) {
        _loop_3(x);
    }
    var _loop_4 = function(x) {
        x = x + 2;
        (function () { return x; });
    };
    for (var x = void 0;;) {
        _loop_4(x);
    }
}
