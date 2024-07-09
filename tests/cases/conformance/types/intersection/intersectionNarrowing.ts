// @strict: true

// Repros from #43130

function f1<T>(x: T & string | T & undefined) {
    if (x) {
        x;  // Should narrow to T & string
    }
}

function f2<T>(x: T & string | T & undefined) {
    if (x !== undefined) {
        x;  // Should narrow to T & string
    }
    else {
        x;  // Should narrow to T & undefined
    }
}

function f3<T>(x: T & string | T & number) {
    if (typeof x === "string") {
        x;  // Should narrow to T & string
    }
    else {
        x;  // Should narrow to T & number
    }
}

function f4<T>(x: T & 1 | T & 2) {
    switch (x) {
        case 1: x; break;  // T & 1
        case 2: x; break;  // T & 2
        default: x;  // Should narrow to never
    }
}

function f5<T extends string | number>(x: T & number) {
    const t1 = x === "hello";  // Should be an error
}
