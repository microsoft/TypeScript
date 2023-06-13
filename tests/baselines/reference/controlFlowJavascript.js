//// [tests/cases/compiler/controlFlowJavascript.ts] ////

//// [controlFlowJavascript.js]
let cond = true;

// CFA for 'let' and no initializer
function f1() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'let' and 'undefined' initializer
function f2() {
    let x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'let' and 'null' initializer
function f3() {
    let x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | null
}

// CFA for 'var' with no initializer
function f5() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'var' with 'undefined' initializer
function f6() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'var' with 'null' initializer
function f7() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | null
}

// No CFA for captured outer variables
function f9() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
    function f() {
        const z = x;  // any
    }
}

// No CFA for captured outer variables
function f10() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
    const f = () => {
        const z = x;  // any
    };
}


//// [out.js]
var cond = true;
// CFA for 'let' and no initializer
function f1() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
}
// CFA for 'let' and 'undefined' initializer
function f2() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
}
// CFA for 'let' and 'null' initializer
function f3() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | null
}
// CFA for 'var' with no initializer
function f5() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
}
// CFA for 'var' with 'undefined' initializer
function f6() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
}
// CFA for 'var' with 'null' initializer
function f7() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | null
}
// No CFA for captured outer variables
function f9() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
    function f() {
        var z = x; // any
    }
}
// No CFA for captured outer variables
function f10() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x; // string | number | undefined
    var f = function () {
        var z = x; // any
    };
}
