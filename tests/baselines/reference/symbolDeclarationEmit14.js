//// [symbolDeclarationEmit14.ts]
class C {
    get [Symbol.isRegExp]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}

//// [symbolDeclarationEmit14.js]
class C {
    get [Symbol.isRegExp]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}


//// [symbolDeclarationEmit14.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
    [Symbol.toStringTag]: string;
}
