//// [tests/cases/compiler/capturedLetConstInLoop3_ES6.ts] ////

//// [capturedLetConstInLoop3_ES6.ts]
///=========let
declare function use(a: any);
function foo0(x) {
    for (let x of []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo0_1(x) {
    for (let x in []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo1(x) {
    for (let x = 0; x < 1; ++x) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo2(x) {
    while (1 === 1) {
        let x = 1;
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }
    
    use(v);
}

function foo3(x) {
    do {
        let x;
        var v;
        (function() { return x + v });
        (() => x + v);
    } while (1 === 1);
    
    use(v);
}

function foo4(x) {
    for (let y = 0; y < 1; ++y) {
        var v = y;
        let x = 1;
        (function() { return x + v });
        (() => x + v);
    }
    
    use(v);
}

function foo5(x) {
    for (let x = 0, y = 1; x < 1; ++x) {
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v);
}


function foo6(x) {
    while (1 === 1) {
        let x, y;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v)
}

function foo7(x) {
    do {
        let x, y;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    } while (1 === 1);
    
    use(v);
}


function foo8(x) {
    for (let y = 0; y < 1; ++y) {
        let x = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v);
}
//===const
function foo0_c(x) {
    for (const x of []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo0_1_c(x) {
    for (const x in []) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo1_c(x) {
    for (const x = 0; x < 1;) {
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }

    use(v);
}

function foo2_c(x) {
    while (1 === 1) {
        const x = 1;
        var v = x;
        (function() { return x + v });
        (() => x + v);
    }
    
    use(v);
}

function foo3_c(x) {
    do {
        const x = 1;
        var v;
        (function() { return x + v });
        (() => x + v);
    } while (1 === 1);
    
    use(v);
}

function foo4_c(x) {
    for (const y = 0; y < 1;) {
        var v = y;
        const x = 1;
        (function() { return x + v });
        (() => x + v);
    }
    
    use(v);
}

function foo5_c(x) {
    for (const x = 0, y = 1; x < 1;) {
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v);
}


function foo6_c(x) {
    while (1 === 1) {
        const x = 1, y = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v)
}

function foo7_c(x) {
    do {
        const x = 1, y = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    } while (1 === 1);
    
    use(v);
}


function foo8_c(x) {
    for (const y = 0; y < 1;) {
        const x = 1;
        var v = x;
        (function() { return x + y + v });
        (() => x + y + v);
    }
    
    use(v);
}

//// [capturedLetConstInLoop3_ES6.js]
function foo0(x) {
    for (let x of []) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo0_1(x) {
    for (let x in []) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo1(x) {
    for (let x = 0; x < 1; ++x) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo2(x) {
    while (1 === 1) {
        let x = 1;
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo3(x) {
    do {
        let x;
        var v;
        (function () { return x + v; });
        (() => x + v);
    } while (1 === 1);
    use(v);
}
function foo4(x) {
    for (let y = 0; y < 1; ++y) {
        var v = y;
        let x = 1;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo5(x) {
    for (let x = 0, y = 1; x < 1; ++x) {
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
function foo6(x) {
    while (1 === 1) {
        let x, y;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
function foo7(x) {
    do {
        let x, y;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    } while (1 === 1);
    use(v);
}
function foo8(x) {
    for (let y = 0; y < 1; ++y) {
        let x = 1;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
//===const
function foo0_c(x) {
    for (const x of []) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo0_1_c(x) {
    for (const x in []) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo1_c(x) {
    for (const x = 0; x < 1;) {
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo2_c(x) {
    while (1 === 1) {
        const x = 1;
        var v = x;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo3_c(x) {
    do {
        const x = 1;
        var v;
        (function () { return x + v; });
        (() => x + v);
    } while (1 === 1);
    use(v);
}
function foo4_c(x) {
    for (const y = 0; y < 1;) {
        var v = y;
        const x = 1;
        (function () { return x + v; });
        (() => x + v);
    }
    use(v);
}
function foo5_c(x) {
    for (const x = 0, y = 1; x < 1;) {
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
function foo6_c(x) {
    while (1 === 1) {
        const x = 1, y = 1;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
function foo7_c(x) {
    do {
        const x = 1, y = 1;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    } while (1 === 1);
    use(v);
}
function foo8_c(x) {
    for (const y = 0; y < 1;) {
        const x = 1;
        var v = x;
        (function () { return x + y + v; });
        (() => x + y + v);
    }
    use(v);
}
