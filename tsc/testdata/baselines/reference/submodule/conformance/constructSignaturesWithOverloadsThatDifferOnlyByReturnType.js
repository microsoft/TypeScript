//// [tests/cases/conformance/types/objectTypeLiteral/constructSignatures/constructSignaturesWithOverloadsThatDifferOnlyByReturnType.ts] ////

//// [constructSignaturesWithOverloadsThatDifferOnlyByReturnType.ts]
// Error for construct signature overloads to differ only by return type

class C {
    constructor(x: number) { }
}

class C2<T> {
    constructor(x: T, y?: string) { }
}

interface I {
    new(x: number, y: string): C;
    new(x: number, y: string): C2<number>; // error
}

interface I2<T> {
    new (x: T, y: string): C2<number>;
    new (x: T, y: string): C; // error
    new <T>(x: T, y: string): C2<T>;
    new <T>(x: T, y: string): C; // error

}

var a: {
    new (x: number, y: string): C2<number>;
    new (x: number, y: string): C; // error
}

var b: {
    new <T>(x: T, y: string): C2<T>;
    new <T>(x: T, y: string): C; // error
}

//// [constructSignaturesWithOverloadsThatDifferOnlyByReturnType.js]
// Error for construct signature overloads to differ only by return type
class C {
    constructor(x) { }
}
class C2 {
    constructor(x, y) { }
}
var a;
var b;
