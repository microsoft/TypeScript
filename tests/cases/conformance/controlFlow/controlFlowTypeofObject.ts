// @strict: true
// @declaration: true

declare function obj(x: object): void;

function f1(x: unknown) {
    if (!x) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f2(x: unknown) {
    if (x === null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f3(x: unknown) {
    if (x == null) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f4(x: unknown) {
    if (x == undefined) {
        return;
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f5(x: unknown) {
    if (!!true) {
        if (!x) {
            return;
        }
    }
    else {
        if (x === null) {
            return;
        }
    }
    if (typeof x === 'object') {
        obj(x);
    }
}

function f6(x: unknown) {
    if (x === null) {
        x;
    }
    else {
        x;
        if (typeof x === 'object') {
            obj(x);
        }
    }
    if (typeof x === 'object') {
        obj(x);  // Error
    }
}
