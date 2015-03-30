//// [symbolDeclarationEmit13.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.toStringTag](x) { }
}

//// [symbolDeclarationEmit13.js]
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.toStringTag](x) { }
}


//// [symbolDeclarationEmit13.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
    [Symbol.toStringTag]: any;
}
