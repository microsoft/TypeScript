//// [tests/cases/compiler/capturedLetConstInLoop2.ts] ////

//// [capturedLetConstInLoop2.ts]
// ========let
function foo0(x) {
    for (let x of []) {
        let a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo0_1(x) {
    for (let x in []) {
        let a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo1(x) {
    for (let x = 0; x < 1; ++x) {
        let a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo2(x) {
    while (1 === 1) {
        let a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo3(x) {
    do {
        let x;
        let a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    } while (1 === 1)
}

function foo4(x) {
    for (let y = 0; y < 1; ++y) {
        let a = arguments.length;
        let x = 1;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo5(x) {
    for (let x = 0, y = 1; x < 1; ++x) {
        let a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}


function foo6(x) {
    while (1 === 1) {
        let x, y;
        let a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}

function foo7(x) {
    do {
        let x, y;
        let a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    } while (1 === 1)
}


function foo8(x) {
    for (let y = 0; y < 1; ++y) {
        let x = 1;
        let a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}
///=======const
function foo0_c(x) {
    for (const x of []) {
        const a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo0_1_c(x) {
    for (const x in []) {
        const a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo1_c(x) {
    for (const x = 0; x < 1;) {
        const a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo2_c(x) {
    while (1 === 1) {
        const a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo3_c(x) {
    do {
        const x = 1;
        const a = arguments.length;
        (function() { return x + a });
        (() => x + a);
    } while (1 === 1)
}

function foo4_c(x) {
    for (const y = 0; y < 1;) {
        const a = arguments.length;
        const x = 1;
        (function() { return x + a });
        (() => x + a);
    }
}

function foo5_c(x) {
    for (const x = 0, y = 1; x < 1;) {
        const a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}


function foo6_c(x) {
    while (1 === 1) {
        const x = 1, y =1 ;
        const a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}

function foo7_c(x) {
    do {
        const x = 1, y = 1;
        const a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    } while (1 === 1)
}


function foo8_c(x) {
    for (const y = 0; y < 1;) {
        const x = 1;
        const a = arguments.length;
        (function() { return x + y + a });
        (() => x + y + a);
    }
}

//// [capturedLetConstInLoop2.js]
// ========let
function foo0(x) {
    var _loop_1 = function (x_1) {
        var a = arguments_1.length;
        (function () { return x_1 + a; });
        (function () { return x_1 + a; });
    };
    var arguments_1 = arguments;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_1 = _a[_i];
        _loop_1(x_1);
    }
}
function foo0_1(x) {
    var _loop_2 = function (x_2) {
        var a = arguments_2.length;
        (function () { return x_2 + a; });
        (function () { return x_2 + a; });
    };
    var arguments_2 = arguments;
    for (var x_2 in []) {
        _loop_2(x_2);
    }
}
function foo1(x) {
    var _loop_3 = function (x_3) {
        var a = arguments_3.length;
        (function () { return x_3 + a; });
        (function () { return x_3 + a; });
    };
    var arguments_3 = arguments;
    for (var x_3 = 0; x_3 < 1; ++x_3) {
        _loop_3(x_3);
    }
}
function foo2(x) {
    var _loop_4 = function () {
        var a = arguments_4.length;
        (function () { return x + a; });
        (function () { return x + a; });
    };
    var arguments_4 = arguments;
    while (1 === 1) {
        _loop_4();
    }
}
function foo3(x) {
    var _loop_5 = function () {
        var x_4;
        var a = arguments_5.length;
        (function () { return x_4 + a; });
        (function () { return x_4 + a; });
    };
    var arguments_5 = arguments;
    do {
        _loop_5();
    } while (1 === 1);
}
function foo4(x) {
    var _loop_6 = function (y) {
        var a = arguments_6.length;
        var x_5 = 1;
        (function () { return x_5 + a; });
        (function () { return x_5 + a; });
    };
    var arguments_6 = arguments;
    for (var y = 0; y < 1; ++y) {
        _loop_6(y);
    }
}
function foo5(x) {
    var _loop_7 = function (x_6, y) {
        var a = arguments_7.length;
        (function () { return x_6 + y + a; });
        (function () { return x_6 + y + a; });
    };
    var arguments_7 = arguments;
    for (var x_6 = 0, y = 1; x_6 < 1; ++x_6) {
        _loop_7(x_6, y);
    }
}
function foo6(x) {
    var _loop_8 = function () {
        var x_7, y;
        var a = arguments_8.length;
        (function () { return x_7 + y + a; });
        (function () { return x_7 + y + a; });
    };
    var arguments_8 = arguments;
    while (1 === 1) {
        _loop_8();
    }
}
function foo7(x) {
    var _loop_9 = function () {
        var x_8, y;
        var a = arguments_9.length;
        (function () { return x_8 + y + a; });
        (function () { return x_8 + y + a; });
    };
    var arguments_9 = arguments;
    do {
        _loop_9();
    } while (1 === 1);
}
function foo8(x) {
    var _loop_10 = function (y) {
        var x_9 = 1;
        var a = arguments_10.length;
        (function () { return x_9 + y + a; });
        (function () { return x_9 + y + a; });
    };
    var arguments_10 = arguments;
    for (var y = 0; y < 1; ++y) {
        _loop_10(y);
    }
}
///=======const
function foo0_c(x) {
    var _loop_11 = function (x_10) {
        var a = arguments_11.length;
        (function () { return x_10 + a; });
        (function () { return x_10 + a; });
    };
    var arguments_11 = arguments;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_10 = _a[_i];
        _loop_11(x_10);
    }
}
function foo0_1_c(x) {
    var _loop_12 = function (x_11) {
        var a = arguments_12.length;
        (function () { return x_11 + a; });
        (function () { return x_11 + a; });
    };
    var arguments_12 = arguments;
    for (var x_11 in []) {
        _loop_12(x_11);
    }
}
function foo1_c(x) {
    var _loop_13 = function (x_12) {
        var a = arguments_13.length;
        (function () { return x_12 + a; });
        (function () { return x_12 + a; });
    };
    var arguments_13 = arguments;
    for (var x_12 = 0; x_12 < 1;) {
        _loop_13(x_12);
    }
}
function foo2_c(x) {
    var _loop_14 = function () {
        var a = arguments_14.length;
        (function () { return x + a; });
        (function () { return x + a; });
    };
    var arguments_14 = arguments;
    while (1 === 1) {
        _loop_14();
    }
}
function foo3_c(x) {
    var _loop_15 = function () {
        var x_13 = 1;
        var a = arguments_15.length;
        (function () { return x_13 + a; });
        (function () { return x_13 + a; });
    };
    var arguments_15 = arguments;
    do {
        _loop_15();
    } while (1 === 1);
}
function foo4_c(x) {
    var _loop_16 = function (y) {
        var a = arguments_16.length;
        var x_14 = 1;
        (function () { return x_14 + a; });
        (function () { return x_14 + a; });
    };
    var arguments_16 = arguments;
    for (var y = 0; y < 1;) {
        _loop_16(y);
    }
}
function foo5_c(x) {
    var _loop_17 = function (x_15, y) {
        var a = arguments_17.length;
        (function () { return x_15 + y + a; });
        (function () { return x_15 + y + a; });
    };
    var arguments_17 = arguments;
    for (var x_15 = 0, y = 1; x_15 < 1;) {
        _loop_17(x_15, y);
    }
}
function foo6_c(x) {
    var _loop_18 = function () {
        var x_16 = 1, y = 1;
        var a = arguments_18.length;
        (function () { return x_16 + y + a; });
        (function () { return x_16 + y + a; });
    };
    var arguments_18 = arguments;
    while (1 === 1) {
        _loop_18();
    }
}
function foo7_c(x) {
    var _loop_19 = function () {
        var x_17 = 1, y = 1;
        var a = arguments_19.length;
        (function () { return x_17 + y + a; });
        (function () { return x_17 + y + a; });
    };
    var arguments_19 = arguments;
    do {
        _loop_19();
    } while (1 === 1);
}
function foo8_c(x) {
    var _loop_20 = function (y) {
        var x_18 = 1;
        var a = arguments_20.length;
        (function () { return x_18 + y + a; });
        (function () { return x_18 + y + a; });
    };
    var arguments_20 = arguments;
    for (var y = 0; y < 1;) {
        _loop_20(y);
    }
}
