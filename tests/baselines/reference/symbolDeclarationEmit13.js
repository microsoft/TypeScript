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
    readonly [Symbol.toPrimitive]: string;
    [Symbol.toStringTag]: any;
}
