//// [emitRestParametersPosition.ts]
function foo1(x: number, ...rest) {
    if (x > 0) {
        return true;
    }

    return rest;
}

function foo2(x: number, ...rest) {
    if (x > 0) {
        return true;
    }
    else if (x < 0) {
        return rest[0];
    }

    return rest;
}

function foo3(x: number, ...rest) {
    if (x > 0) {
        return true;
    }
    else if (x < 0) {
        return false;
    }

    return rest;
}

function foo4(s: string, ...rest) {
    if (s === "hello world") {
        return true;
    }

    if (s) {
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === "1") {
                return rest[0];
            }
        }
    }

    return rest[1];
}


//// [emitRestParametersPosition.js]
function foo1(x) {
    if (x > 0) {
        return true;
    }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return rest;
}
function foo2(x) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (x > 0) {
        return true;
    }
    else if (x < 0) {
        return rest[0];
    }
    return rest;
}
function foo3(x) {
    if (x > 0) {
        return true;
    }
    else if (x < 0) {
        return false;
    }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return rest;
}
function foo4(s) {
    if (s === "hello world") {
        return true;
    }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (s) {
        for (var i = 0; i < s.length; i++) {
            if (s.charAt(i) === "1") {
                return rest[0];
            }
        }
    }
    return rest[1];
}
