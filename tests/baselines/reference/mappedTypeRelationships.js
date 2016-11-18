//// [mappedTypeRelationships.ts]

function f1<T>(x: T, k: keyof T) {
    return x[k];
}

function f2<T, K extends keyof T>(x: T, k: K) {
    return x[k];
}

function f3<T, U extends T>(x: T, y: U, k: keyof T) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f4<T, U extends T, K extends keyof T>(x: T, y: U, k: K) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f5<T, U extends T>(x: T, y: U, k: keyof U) {
    x[k] = y[k];  // Error
    y[k] = x[k];  // Error
}

function f6<T, U extends T, K extends keyof U>(x: T, y: U, k: K) {
    x[k] = y[k];  // Error
    y[k] = x[k];  // Error
}

function f10<T>(x: T, y: Partial<T>, k: keyof T) {
    x[k] = y[k];  // Error
    y[k] = x[k];
}

function f11<T, K extends keyof T>(x: T, y: Partial<T>, k: K) {
    x[k] = y[k];  // Error
    y[k] = x[k];
}

function f12<T, U extends T>(x: T, y: Partial<U>, k: keyof T) {
    x[k] = y[k];  // Error
    y[k] = x[k];  // Error
}

function f13<T, U extends T, K extends keyof T>(x: T, y: Partial<U>, k: K) {
    x[k] = y[k];  // Error
    y[k] = x[k];  // Error
}

function f20<T>(x: T, y: Readonly<T>, k: keyof T) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f21<T, K extends keyof T>(x: T, y: Readonly<T>, k: K) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f22<T, U extends T>(x: T, y: Readonly<U>, k: keyof T) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f23<T, U extends T, K extends keyof T>(x: T, y: Readonly<U>, k: K) {
    x[k] = y[k];
    y[k] = x[k];  // Error
}

function f30<T>(x: T, y: Partial<T>) {
    x = y;  // Error
    y = x;
}

function f31<T>(x: T, y: Partial<T>) {
    x = y;  // Error
    y = x;
}

function f40<T>(x: T, y: Readonly<T>) {
    x = y;
    y = x;
}

function f41<T>(x: T, y: Readonly<T>) {
    x = y;
    y = x;
}

type Item = {
    name: string;
}

type ItemMap = {
    [x: string]: Item;
}

function f50<T extends ItemMap>(obj: T, key: keyof T) {
    let item: Item = obj[key];
    return obj[key].name;
}

function f51<T extends ItemMap, K extends keyof T>(obj: T, key: K) {
    let item: Item = obj[key];
    return obj[key].name;
}

//// [mappedTypeRelationships.js]
function f1(x, k) {
    return x[k];
}
function f2(x, k) {
    return x[k];
}
function f3(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f4(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f5(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k]; // Error
}
function f6(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k]; // Error
}
function f10(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k];
}
function f11(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k];
}
function f12(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k]; // Error
}
function f13(x, y, k) {
    x[k] = y[k]; // Error
    y[k] = x[k]; // Error
}
function f20(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f21(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f22(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f23(x, y, k) {
    x[k] = y[k];
    y[k] = x[k]; // Error
}
function f30(x, y) {
    x = y; // Error
    y = x;
}
function f31(x, y) {
    x = y; // Error
    y = x;
}
function f40(x, y) {
    x = y;
    y = x;
}
function f41(x, y) {
    x = y;
    y = x;
}
function f50(obj, key) {
    var item = obj[key];
    return obj[key].name;
}
function f51(obj, key) {
    var item = obj[key];
    return obj[key].name;
}


//// [mappedTypeRelationships.d.ts]
declare function f1<T>(x: T, k: keyof T): T[keyof T];
declare function f2<T, K extends keyof T>(x: T, k: K): T[K];
declare function f3<T, U extends T>(x: T, y: U, k: keyof T): void;
declare function f4<T, U extends T, K extends keyof T>(x: T, y: U, k: K): void;
declare function f5<T, U extends T>(x: T, y: U, k: keyof U): void;
declare function f6<T, U extends T, K extends keyof U>(x: T, y: U, k: K): void;
declare function f10<T>(x: T, y: Partial<T>, k: keyof T): void;
declare function f11<T, K extends keyof T>(x: T, y: Partial<T>, k: K): void;
declare function f12<T, U extends T>(x: T, y: Partial<U>, k: keyof T): void;
declare function f13<T, U extends T, K extends keyof T>(x: T, y: Partial<U>, k: K): void;
declare function f20<T>(x: T, y: Readonly<T>, k: keyof T): void;
declare function f21<T, K extends keyof T>(x: T, y: Readonly<T>, k: K): void;
declare function f22<T, U extends T>(x: T, y: Readonly<U>, k: keyof T): void;
declare function f23<T, U extends T, K extends keyof T>(x: T, y: Readonly<U>, k: K): void;
declare function f30<T>(x: T, y: Partial<T>): void;
declare function f31<T>(x: T, y: Partial<T>): void;
declare function f40<T>(x: T, y: Readonly<T>): void;
declare function f41<T>(x: T, y: Readonly<T>): void;
declare type Item = {
    name: string;
};
declare type ItemMap = {
    [x: string]: Item;
};
declare function f50<T extends ItemMap>(obj: T, key: keyof T): string;
declare function f51<T extends ItemMap, K extends keyof T>(obj: T, key: K): string;
