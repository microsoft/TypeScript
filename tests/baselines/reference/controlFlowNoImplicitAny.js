//// [controlFlowNoImplicitAny.ts]

declare let cond: boolean;

function f1() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f2() {
    let x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f3() {
    let x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f4() {
    let x: any;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f5() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f6() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f7() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f8() {
    var x: any;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
}

function f9() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
    function f() {
        const z = x;
    }
}

function f10() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;
    const f = () => {
        const z = x;
    };
}

//// [controlFlowNoImplicitAny.js]
function f1() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f2() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f3() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f4() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f5() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f6() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f7() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f8() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
}
function f9() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
    function f() {
        var z = x;
    }
}
function f10() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    var y = x;
    var f = function () {
        var z = x;
    };
}
