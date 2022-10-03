//// [symbolDeclarationEmit13.ts]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toStringTag](x) { }
}

//// [symbolDeclarationEmit13.js]
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toStringTag](x) { }
}


//// [symbolDeclarationEmit13.d.ts]
declare class C {
    get [Symbol.toPrimitive](): string;
    set [Symbol.toStringTag](x: any);
}
