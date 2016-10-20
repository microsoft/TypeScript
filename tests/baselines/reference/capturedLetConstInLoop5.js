//// [capturedLetConstInLoop5.ts]
declare function use(a: any);

//====let
function foo0(x) {
    for (let x of []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }

    use(v);
}

function foo00(x) {
    for (let x in []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == "1") {
            return;
        }
    }

    use(v);
}

function foo1(x) {
    for (let x = 0; x < 1; ++x) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }

    use(v);
}

function foo2(x) {
    while (1 === 1) {
        let x = 1;
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

function foo3(x) {
    do {
        let x;
        var v;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    } while (1 === 1)
    
    use(v);
}

function foo4(x) {
    for (let y = 0; y < 1; ++y) {
        var v = y;
        let x = 1;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

function foo5(x) {
    for (let x = 0, y = 1; x < 1; ++x) {
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}


function foo6(x) {
    while (1 === 1) {
        let x, y;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    };
    
    use(v)
}

function foo7(x) {
    do {
        let x, y;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    } while (1 === 1);
    
    use(v);
}


function foo8(x) {
    for (let y = 0; y < 1; ++y) {
        let x = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

//====const
function foo0_c(x) {
    for (const x of []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }

    use(v);
}

function foo00_c(x) {
    for (const x in []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == "1") {
            return;
        }
    }

    use(v);
}

function foo1_c(x) {
    for (const x = 0; x < 1;) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }

    use(v);
}

function foo2_c(x) {
    while (1 === 1) {
        const x = 1;
        var v = x;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

function foo3_c(x) {
    do {
        const x = 1;
        var v;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    } while (1 === 1)
    
    use(v);
}

function foo4_c(x) {
    for (const y = 0; y < 1;) {
        var v = y;
        let x = 1;
        (function() { return x + v });
        (() => x + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

function foo5_c(x) {
    for (const x = 0, y = 1; x < 1;) {
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}


function foo6_c(x) {
    while (1 === 1) {
        const x = 1, y = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v)
}

function foo7_c(x) {
    do {
        const x = 1, y = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    } while (1 === 1)
    
    use(v);
}


function foo8_c(x) {
    for (const y = 0; y < 1;) {
        const x = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
        if (x == 1) {
            return;
        }
    }
    
    use(v);
}

//// [capturedLetConstInLoop5.js]
//====let
function foo0(x) {
    var _loop_1 = function (x_1) {
        v = x_1;
        (function () { return x_1 + v; });
        (function () { return x_1 + v; });
        if (x_1 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_1 = _a[_i];
        var state_1 = _loop_1(x_1);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    use(v);
}
function foo00(x) {
    var _loop_2 = function (x_2) {
        v = x_2;
        (function () { return x_2 + v; });
        (function () { return x_2 + v; });
        if (x_2 == "1") {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_2 in []) {
        var state_2 = _loop_2(x_2);
        if (typeof state_2 === "object")
            return state_2.value;
    }
    use(v);
}
function foo1(x) {
    var _loop_3 = function (x_3) {
        v = x_3;
        (function () { return x_3 + v; });
        (function () { return x_3 + v; });
        if (x_3 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_3 = 0; x_3 < 1; ++x_3) {
        var state_3 = _loop_3(x_3);
        if (typeof state_3 === "object")
            return state_3.value;
    }
    use(v);
}
function foo2(x) {
    var _loop_4 = function () {
        var x_4 = 1;
        v = x_4;
        (function () { return x_4 + v; });
        (function () { return x_4 + v; });
        if (x_4 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    while (1 === 1) {
        var state_4 = _loop_4();
        if (typeof state_4 === "object")
            return state_4.value;
    }
    use(v);
}
function foo3(x) {
    var _loop_5 = function () {
        var x_5;
        (function () { return x_5 + v; });
        (function () { return x_5 + v; });
        if (x_5 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    do {
        var state_5 = _loop_5();
        if (typeof state_5 === "object")
            return state_5.value;
    } while (1 === 1);
    use(v);
}
function foo4(x) {
    var _loop_6 = function (y) {
        v = y;
        var x_6 = 1;
        (function () { return x_6 + v; });
        (function () { return x_6 + v; });
        if (x_6 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var y = 0; y < 1; ++y) {
        var state_6 = _loop_6(y);
        if (typeof state_6 === "object")
            return state_6.value;
    }
    use(v);
}
function foo5(x) {
    var _loop_7 = function (x_7, y) {
        v = x_7;
        (function () { return x_7 + y + v; });
        (function () { return x_7 + y + v; });
        if (x_7 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_7 = 0, y = 1; x_7 < 1; ++x_7) {
        var state_7 = _loop_7(x_7, y);
        if (typeof state_7 === "object")
            return state_7.value;
    }
    use(v);
}
function foo6(x) {
    var _loop_8 = function () {
        var x_8, y;
        v = x_8;
        (function () { return x_8 + y + v; });
        (function () { return x_8 + y + v; });
        if (x_8 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    while (1 === 1) {
        var state_8 = _loop_8();
        if (typeof state_8 === "object")
            return state_8.value;
    }
    ;
    use(v);
}
function foo7(x) {
    var _loop_9 = function () {
        var x_9, y;
        v = x_9;
        (function () { return x_9 + y + v; });
        (function () { return x_9 + y + v; });
        if (x_9 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    do {
        var state_9 = _loop_9();
        if (typeof state_9 === "object")
            return state_9.value;
    } while (1 === 1);
    use(v);
}
function foo8(x) {
    var _loop_10 = function (y) {
        var x_10 = 1;
        v = x_10;
        (function () { return x_10 + y + v; });
        (function () { return x_10 + y + v; });
        if (x_10 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var y = 0; y < 1; ++y) {
        var state_10 = _loop_10(y);
        if (typeof state_10 === "object")
            return state_10.value;
    }
    use(v);
}
//====const
function foo0_c(x) {
    var _loop_11 = function (x_11) {
        v = x_11;
        (function () { return x_11 + v; });
        (function () { return x_11 + v; });
        if (x_11 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_11 = _a[_i];
        var state_11 = _loop_11(x_11);
        if (typeof state_11 === "object")
            return state_11.value;
    }
    use(v);
}
function foo00_c(x) {
    var _loop_12 = function (x_12) {
        v = x_12;
        (function () { return x_12 + v; });
        (function () { return x_12 + v; });
        if (x_12 == "1") {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_12 in []) {
        var state_12 = _loop_12(x_12);
        if (typeof state_12 === "object")
            return state_12.value;
    }
    use(v);
}
function foo1_c(x) {
    var _loop_13 = function (x_13) {
        v = x_13;
        (function () { return x_13 + v; });
        (function () { return x_13 + v; });
        if (x_13 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_13 = 0; x_13 < 1;) {
        var state_13 = _loop_13(x_13);
        if (typeof state_13 === "object")
            return state_13.value;
    }
    use(v);
}
function foo2_c(x) {
    var _loop_14 = function () {
        var x_14 = 1;
        v = x_14;
        (function () { return x_14 + v; });
        (function () { return x_14 + v; });
        if (x_14 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    while (1 === 1) {
        var state_14 = _loop_14();
        if (typeof state_14 === "object")
            return state_14.value;
    }
    use(v);
}
function foo3_c(x) {
    var _loop_15 = function () {
        var x_15 = 1;
        (function () { return x_15 + v; });
        (function () { return x_15 + v; });
        if (x_15 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    do {
        var state_15 = _loop_15();
        if (typeof state_15 === "object")
            return state_15.value;
    } while (1 === 1);
    use(v);
}
function foo4_c(x) {
    var _loop_16 = function (y) {
        v = y;
        var x_16 = 1;
        (function () { return x_16 + v; });
        (function () { return x_16 + v; });
        if (x_16 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var y = 0; y < 1;) {
        var state_16 = _loop_16(y);
        if (typeof state_16 === "object")
            return state_16.value;
    }
    use(v);
}
function foo5_c(x) {
    var _loop_17 = function (x_17, y) {
        v = x_17;
        (function () { return x_17 + y + v; });
        (function () { return x_17 + y + v; });
        if (x_17 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var x_17 = 0, y = 1; x_17 < 1;) {
        var state_17 = _loop_17(x_17, y);
        if (typeof state_17 === "object")
            return state_17.value;
    }
    use(v);
}
function foo6_c(x) {
    var _loop_18 = function () {
        var x_18 = 1, y = 1;
        v = x_18;
        (function () { return x_18 + y + v; });
        (function () { return x_18 + y + v; });
        if (x_18 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    while (1 === 1) {
        var state_18 = _loop_18();
        if (typeof state_18 === "object")
            return state_18.value;
    }
    use(v);
}
function foo7_c(x) {
    var _loop_19 = function () {
        var x_19 = 1, y = 1;
        v = x_19;
        (function () { return x_19 + y + v; });
        (function () { return x_19 + y + v; });
        if (x_19 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    do {
        var state_19 = _loop_19();
        if (typeof state_19 === "object")
            return state_19.value;
    } while (1 === 1);
    use(v);
}
function foo8_c(x) {
    var _loop_20 = function (y) {
        var x_20 = 1;
        v = x_20;
        (function () { return x_20 + y + v; });
        (function () { return x_20 + y + v; });
        if (x_20 == 1) {
            return { value: void 0 };
        }
    };
    var v;
    for (var y = 0; y < 1;) {
        var state_20 = _loop_20(y);
        if (typeof state_20 === "object")
            return state_20.value;
    }
    use(v);
}
