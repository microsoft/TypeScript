// @strict: true
// @noemit: true

function f3<T, U extends T>(x: T, y: U, k: keyof T) {
    x[k] = y[k];
    y[k] = x[k]; 
}

function f<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function f2<T extends {} | null | undefined , K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function f3<T extends unknown, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function f4<T, U extends T, K extends keyof U>(obj: U, key: K) {
    return obj[key];
}

function f5<T extends {} | null | undefined, U extends T, K extends keyof U>(obj: U, key: K) {
    return obj[key];
}

function f6<T extends unknown, U extends T, K extends keyof U>(obj: U, key: K) {
    return obj[key];
}

// ************
function g1<T>(obj: T, key: keyof T) {
    return obj[key];
}

function g2<T extends {} | null | undefined>(obj: T, key: keyof T) {
    return obj[key];
}

function g3<T extends unknown>(obj: T, key: keyof T) {
    return obj[key];
}

function g4<T, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}

function g5<T extends {} | null | undefined, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}

function g6<T extends unknown, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}

// **************
function h1<T, K extends keyof T>(obj: T, other: T, key: K) {
    obj[key]; 
    other[key];
    return;
}

function h2<T extends {} | null | undefined , K extends keyof T>(obj: T, other: T, key: K) {
    obj[key]; 
    other[key];
    return;}

function h3<T extends unknown, K extends keyof T>(obj: T, other: T, key: K) {
    obj[key]; 
    other[key];
    return;
}

// **************
function i1<T, U extends T, K extends keyof T>(obj: T, other: U, key: K) {
    obj[key]; 
    other[key];
    return;
}

function i2<T extends {} | null | undefined , U extends T, K extends keyof T>(obj: T, other: U, key: K) {
    obj[key]; 
    other[key];
    return;}

function i3<T extends unknown, U extends T, K extends keyof T>(obj: T, other: U, key: K) {
    obj[key]; 
    other[key];
    return;
}


// ************
function j1<T, U extends T>(obj: U, key: keyof T) {
    return obj[key];
}

function j2<T extends {} | null | undefined, U extends T>(obj: U, key: keyof T) {
    return obj[key];
}

function j3<T extends unknown, U extends T>(obj: U, key: keyof T) {
    return obj[key];
}


// ************
function j1<T, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}

function j2<T extends {} | null | undefined, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}

function j3<T extends unknown, U extends T>(obj: U, key: keyof U) {
    return obj[key];
}
