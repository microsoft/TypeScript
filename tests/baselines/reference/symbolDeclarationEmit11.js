//// [symbolDeclarationEmit11.ts]
class C {
    static [Symbol.iterator] = 0;
    static [Symbol.toPrimitive]() { }
    static get [Symbol.isRegExp]() { return ""; }
    static set [Symbol.isRegExp](x) { }
}

//// [symbolDeclarationEmit11.js]
class C {
    static [Symbol.toPrimitive]() { }
    static get [Symbol.isRegExp]() { return ""; }
    static set [Symbol.isRegExp](x) { }
}
C[Symbol.iterator] = 0;


//// [symbolDeclarationEmit11.d.ts]
declare class C {
    static [Symbol.iterator]: number;
    static [Symbol.toPrimitive](): void;
    static [Symbol.isRegExp]: string;
}
