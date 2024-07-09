// @allowUnreachableCode: false
// @noImplicitReturns: true

function f0(x): number {
    while (true);
}

function f1(x): number {
    if (x) {
        return 1
    }
}

function f2(x): number {
    while (x) {
        throw new Error();
    }
    return 1;
}

function f3(x): number {
    while (x) {
        throw new Error();
    }
}

function f3_1 (x): number {
    while (x) {
    }
    throw new Error();
}

function f4(x): number {
    try {
        if (x) {
            return 1;
        }
    }
    catch (e) {
    }
}

function f5(x): number {
    try {
        if (x) {
            return 1;
        }
    }
    catch (e) {
        return 2;
    }
}

function f6(x): number {
    try {
        if (x) {
            return 1;
        }
        else 
        {
            throw new Error();
        }
    }
    catch (e) {
    }
}

function f7(x): number {
    try {
        if (x) {
            return 1;
        }
        else {
            throw new Error();
        }
    }
    catch (e) {
        return 1;
    }
}

function f8(x): number {
    try {
        if (true) {
            x++;
        }
        else {
            return 1;
        }
    }
    catch (e) {
        return 1;
    }
}

function f9(x): number {
    try {
        while (false) {
            return 1;
        }
    }
    catch (e) {
        return 1;
    }
}

function f10(x): number {
    try {
        do {
            x++;
        } while (true);
    }
    catch (e) {
        return 1;
    }
}

function f11(x): number {
    test:
    try {
        do {
            do {
                break test;
            } while (true);
            x++;
        } while (true);
    }
    catch (e) {
        return 1;
    }
}