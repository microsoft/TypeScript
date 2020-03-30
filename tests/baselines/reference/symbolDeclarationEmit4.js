//// [symbolDeclarationEmit4.ts]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toPrimitive](x) { }
}

//// [symbolDeclarationEmit4.js]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toPrimitive](x) { }
}


//// [symbolDeclarationEmit4.d.ts]
declare class C {
    get [Symbol.toPrimitive](): string;
    set [Symbol.toPrimitive](x: string);
}
