//// [constLocalsInFunctionExpressions.ts]
declare function getStringOrNumber(): string | number;

function f1() {
    const x = getStringOrNumber();
    if (typeof x === "string") {
        const f = () => x.length;
    }
}

function f2() {
    const x = getStringOrNumber();
    if (typeof x !== "string") {
        return;
    }
    const f = () => x.length;
}

function f3() {
    const x = getStringOrNumber();
    if (typeof x === "string") {
        const f = function() { return x.length; };
    }
}

function f4() {
    const x = getStringOrNumber();
    if (typeof x !== "string") {
        return;
    }
    const f = function() { return x.length; };
}

function f5() {
    const x = getStringOrNumber();
    if (typeof x === "string") {
        const f = () => () => x.length;
    }
}

//// [constLocalsInFunctionExpressions.js]
function f1() {
    var x = getStringOrNumber();
    if (typeof x === "string") {
        var f = function () { return x.length; };
    }
}
function f2() {
    var x = getStringOrNumber();
    if (typeof x !== "string") {
        return;
    }
    var f = function () { return x.length; };
}
function f3() {
    var x = getStringOrNumber();
    if (typeof x === "string") {
        var f = function () { return x.length; };
    }
}
function f4() {
    var x = getStringOrNumber();
    if (typeof x !== "string") {
        return;
    }
    var f = function () { return x.length; };
}
function f5() {
    var x = getStringOrNumber();
    if (typeof x === "string") {
        var f = function () { return function () { return x.length; }; };
    }
}
