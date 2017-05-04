//// [capturedLetConstInLoop2_ES6.ts]
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

//// [capturedLetConstInLoop2_ES6.js]
// ========let
function foo0(x) {
    for (let x of []) {
        let a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo0_1(x) {
    for (let x in []) {
        let a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo1(x) {
    for (let x = 0; x < 1; ++x) {
        let a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo2(x) {
    while (1 === 1) {
        let a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo3(x) {
    do {
        let x;
        let a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    } while (1 === 1);
}
function foo4(x) {
    for (let y = 0; y < 1; ++y) {
        let a = arguments.length;
        let x = 1;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo5(x) {
    for (let x = 0, y = 1; x < 1; ++x) {
        let a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
function foo6(x) {
    while (1 === 1) {
        let x, y;
        let a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
function foo7(x) {
    do {
        let x, y;
        let a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    } while (1 === 1);
}
function foo8(x) {
    for (let y = 0; y < 1; ++y) {
        let x = 1;
        let a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
///=======const
function foo0_c(x) {
    for (const x of []) {
        const a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo0_1_c(x) {
    for (const x in []) {
        const a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo1_c(x) {
    for (const x = 0; x < 1;) {
        const a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo2_c(x) {
    while (1 === 1) {
        const a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo3_c(x) {
    do {
        const x = 1;
        const a = arguments.length;
        (function () { return x + a; });
        (() => x + a);
    } while (1 === 1);
}
function foo4_c(x) {
    for (const y = 0; y < 1;) {
        const a = arguments.length;
        const x = 1;
        (function () { return x + a; });
        (() => x + a);
    }
}
function foo5_c(x) {
    for (const x = 0, y = 1; x < 1;) {
        const a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
function foo6_c(x) {
    while (1 === 1) {
        const x = 1, y = 1;
        const a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
function foo7_c(x) {
    do {
        const x = 1, y = 1;
        const a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    } while (1 === 1);
}
function foo8_c(x) {
    for (const y = 0; y < 1;) {
        const x = 1;
        const a = arguments.length;
        (function () { return x + y + a; });
        (() => x + y + a);
    }
}
