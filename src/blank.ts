declare const MyArray: {
    isArray<T>(arg: T | {}): arg is T extends readonly any[] ? readonly any[] : any[];
};

declare const a: readonly string[] | string;
declare const b: string[] | string;
declare const c: unknown;

if (MyArray.isArray(a)) {
    a;
}
else {
    a;
}
a;

if (MyArray.isArray(b)) {
    b;
}
else {
    b;
}
b;

if (MyArray.isArray(c)) {
    c;
}


function f<T>(x: T) {
    const a: readonly T[] | string = null!;
    const b: T[] | string = null!;
    const c: T = null!;

    if (MyArray.isArray(a)) {
        a;
    }
    else {
        a;
    }
    a;

    if (MyArray.isArray(b)) {
        b;
    }
    else {
        b;
    }
    b;

    if (MyArray.isArray(c)) {
        c;
    }
}
