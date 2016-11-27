//// [isomorphicMappedTypeInference.ts]

type Box<T> = {
    value: T;
}

type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
}

function box<T>(x: T): Box<T> {
    return { value: x };
}

function unbox<T>(x: Box<T>): T {
    return x.value;
}

function boxify<T>(obj: T): Boxified<T> {
    let result = {} as Boxified<T>;
    for (let k in obj) {
        result[k] = box(obj[k]);
    }
    return result;
}

function unboxify<T>(obj: Boxified<T>): T {
    let result = {} as T;
    for (let k in obj) {
        result[k] = unbox(obj[k]);
    }
    return result;
}

function assignBoxified<T>(obj: Boxified<T>, values: T) {
    for (let k in values) {
        obj[k].value = values[k];
    }
}

function f1() {
    let v = {
        a: 42,
        b: "hello",
        c: true
    };
    let b = boxify(v);
    let x: number = b.a.value;
}

function f2() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    let v = unboxify(b);
    let x: number = v.a;
}

function f3() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    assignBoxified(b, { c: false });
}

function f4() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    b = boxify(unboxify(b));
    b = unboxify(boxify(b));
}

function makeRecord<T, K extends string>(obj: { [P in K]: T }) {
    return obj;
}

function f5(s: string) {
    let b = makeRecord({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v.a;
}

function makeDictionary<T>(obj: { [x: string]: T }) {
    return obj;
}

function f6(s: string) {
    let b = makeDictionary({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v[s];
}

//// [isomorphicMappedTypeInference.js]
function box(x) {
    return { value: x };
}
function unbox(x) {
    return x.value;
}
function boxify(obj) {
    var result = {};
    for (var k in obj) {
        result[k] = box(obj[k]);
    }
    return result;
}
function unboxify(obj) {
    var result = {};
    for (var k in obj) {
        result[k] = unbox(obj[k]);
    }
    return result;
}
function assignBoxified(obj, values) {
    for (var k in values) {
        obj[k].value = values[k];
    }
}
function f1() {
    var v = {
        a: 42,
        b: "hello",
        c: true
    };
    var b = boxify(v);
    var x = b.a.value;
}
function f2() {
    var b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    var v = unboxify(b);
    var x = v.a;
}
function f3() {
    var b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    assignBoxified(b, { c: false });
}
function f4() {
    var b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    b = boxify(unboxify(b));
    b = unboxify(boxify(b));
}
function makeRecord(obj) {
    return obj;
}
function f5(s) {
    var b = makeRecord({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    var v = unboxify(b);
    var x = v.a;
}
function makeDictionary(obj) {
    return obj;
}
function f6(s) {
    var b = makeDictionary({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    var v = unboxify(b);
    var x = v[s];
}


//// [isomorphicMappedTypeInference.d.ts]
declare type Box<T> = {
    value: T;
};
declare type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
};
declare function box<T>(x: T): Box<T>;
declare function unbox<T>(x: Box<T>): T;
declare function boxify<T>(obj: T): Boxified<T>;
declare function unboxify<T>(obj: Boxified<T>): T;
declare function assignBoxified<T>(obj: Boxified<T>, values: T): void;
declare function f1(): void;
declare function f2(): void;
declare function f3(): void;
declare function f4(): void;
declare function makeRecord<T, K extends string>(obj: {
    [P in K]: T;
}): {
    [P in K]: T;
};
declare function f5(s: string): void;
declare function makeDictionary<T>(obj: {
    [x: string]: T;
}): {
    [x: string]: T;
};
declare function f6(s: string): void;
