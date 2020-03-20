//// [nestedBlockScopedBindings6.ts]
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

//// [nestedBlockScopedBindings6.js]
function a0() {
    for (var _i = 0, _a = [1]; _i < _a.length; _i++) {
        var x = _a[_i];
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
    for (var _i = 0, _b = [1]; _i < _b.length; _i++) {
        var x = _b[_i];
        _loop_1(x);
    }
    for (var x = void 0;;) {
        x = x + 2;
    }
}
function a2() {
    for (var _i = 0, _c = [1]; _i < _c.length; _i++) {
        var x = _c[_i];
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
    for (var _i = 0, _d = [1]; _i < _d.length; _i++) {
        var x = _d[_i];
        _loop_3(x);
    }
    var _loop_4 = function (x) {
        x = x + 2;
        (function () { return x; });
        out_x_2 = x;
    };
    var out_x_2;
    for (var x = void 0;;) {
        _loop_4(x);
        x = out_x_2;
    }
}
function a4() {
    var _loop_5 = function (x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var _i = 0, _e = [1]; _i < _e.length; _i++) {
        var x = _e[_i];
        _loop_5(x);
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
function a5() {
    for (var _i = 0, _f = [1]; _i < _f.length; _i++) {
        var x = _f[_i];
        x = x + 1;
    }
    switch (1) {
        case 1:
            var x_1;
            (function () { return x_1; });
            break;
    }
}
function a6() {
    for (var _i = 0, _g = [1]; _i < _g.length; _i++) {
        var x = _g[_i];
        x = x + 1;
    }
    switch (1) {
        case 1:
            var x = void 0;
            break;
    }
}
function a7() {
    var _loop_6 = function (x) {
        x = x + 1;
        (function () { return x; });
    };
    for (var _i = 0, _h = [1]; _i < _h.length; _i++) {
        var x = _h[_i];
        _loop_6(x);
    }
    switch (1) {
        case 1:
            var x_2;
            (function () { return x_2; });
            break;
    }
}
