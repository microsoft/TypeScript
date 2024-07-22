
// @strict: true
// @noemit: true

function f1<T>(a: T, b: T): boolean {
    return a > b;
}

function f2<T extends {} | undefined | null>(a: T, b: T): boolean {
    return a > b;
}

function f3<T extends unknown>(a: T, b: T): boolean {
    return a > b;
}

function f4<T, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f5<T extends {} | undefined | null, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f6<T extends unknown, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f7<T extends {} | undefined, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f8<T extends {} | null, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f9<T extends undefined | null, U extends T>(a: U, b: U): boolean {
    return a > b;
}

function f10<T, U>(x: T | U, y: T | U) {
    return x < y;
}

function f11<T, U extends T>(x: T | number, y: U | number) {
    return x < y;
}

function f12<T, U>(x: T & U, y: T & U) {
    return x < y;
}

function f13<T, U extends T>(x: T & number, y: U & number) {
    return x < y;
}


function compare<T>(a: T, b: T): boolean {
    if (a === undefined) {
        return false;
    }
    if (b === null) {
        return false;
    }
    return a > b;
}