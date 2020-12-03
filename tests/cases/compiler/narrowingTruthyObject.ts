// @strict: true

function foo(x: unknown, b: boolean) {
    if (typeof x === 'object') {
        x.toString();
    }
    if (typeof x === 'object' && x) {
        x.toString();
    }
    if (x && typeof x === 'object') {
        x.toString();
    }
    if (b && x && typeof x === 'object') {
        x.toString();
    }
    if (x && b && typeof x === 'object') {
        x.toString();
    }
    if (x && b && b && typeof x === 'object') {
        x.toString();
    }
    if (b && b && x && b && b && typeof x === 'object') {
        x.toString();
    }
}

// Repro from #36870

function f1(x: unknown): any {
    return x && typeof x === 'object' && x.hasOwnProperty('x');
}
