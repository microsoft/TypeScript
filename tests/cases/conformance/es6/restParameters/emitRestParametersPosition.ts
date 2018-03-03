// @target: es5
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
