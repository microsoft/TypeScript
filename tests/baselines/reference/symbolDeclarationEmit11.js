//// [symbolDeclarationEmit11.ts]
class C {
    static [Symbol.iterator] = 0;
    static [Symbol.isConcatSpreadable]() { }
    static get [Symbol.toPrimitive]() { return ""; }
    static set [Symbol.toPrimitive](x) { }
}

//// [symbolDeclarationEmit11.js]
var _a;
class C {
    static [(_a = Symbol.iterator, Symbol.isConcatSpreadable)]() { }
    static get [Symbol.toPrimitive]() { return ""; }
    static set [Symbol.toPrimitive](x) { }
}
C[_a] = 0;


//// [symbolDeclarationEmit11.d.ts]
declare class C {
    static [Symbol.iterator]: number;
    static [Symbol.isConcatSpreadable](): void;
    static get [Symbol.toPrimitive](): string;
    static set [Symbol.toPrimitive](x: string);
}
