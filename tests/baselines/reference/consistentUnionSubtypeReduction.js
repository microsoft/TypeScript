//// [consistentUnionSubtypeReduction.ts]
// https://github.com/microsoft/TypeScript/issues/31155

declare const MyArray: {
    isArray<T>(arg: T | {}): arg is T extends readonly any[] ? (unknown extends T ? never : readonly any[]) : any[];
};

declare const a: readonly string[] | string;
declare const b: string[] | string;
declare const c: unknown;

if (MyArray.isArray(a)) {
    a; // readonly string[]
}
else {
    a;  // string
}
a; // readonly string[] | string;

if (MyArray.isArray(b)) {
    b; // string[] | string;
}
else {
    b; // string
}
b; // string[] | string;

if (MyArray.isArray(c)) {
    c; // any[]
}


function f<T>(x: T) {
    const a: readonly T[] | string = null!;
    const b: T[] | string = null!;
    const c: T = null!;

    if (MyArray.isArray(a)) {
        a; // readonly T[]
    }
    else {
        a; // string
    }
    a; // readonly T[] | string;

    if (MyArray.isArray(b)) {
        b; // T[]
    }
    else {
        b; // string
    }
    b;

    if (MyArray.isArray(c)) {
        c; // T & (T extends readonly any[] ? readonly any[] : any[])
    }
}


//// [consistentUnionSubtypeReduction.js]
// https://github.com/microsoft/TypeScript/issues/31155
if (MyArray.isArray(a)) {
    a; // readonly string[]
}
else {
    a; // string
}
a; // readonly string[] | string;
if (MyArray.isArray(b)) {
    b; // string[] | string;
}
else {
    b; // string
}
b; // string[] | string;
if (MyArray.isArray(c)) {
    c; // any[]
}
function f(x) {
    var a = null;
    var b = null;
    var c = null;
    if (MyArray.isArray(a)) {
        a; // readonly T[]
    }
    else {
        a; // string
    }
    a; // readonly T[] | string;
    if (MyArray.isArray(b)) {
        b; // T[]
    }
    else {
        b; // string
    }
    b;
    if (MyArray.isArray(c)) {
        c; // T & (T extends readonly any[] ? readonly any[] : any[])
    }
}
