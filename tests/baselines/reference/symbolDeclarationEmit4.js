//// [symbolDeclarationEmit4.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.isRegExp](x) { }
}

//// [symbolDeclarationEmit4.js]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.isRegExp](x) { }
}


//// [symbolDeclarationEmit4.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
}
