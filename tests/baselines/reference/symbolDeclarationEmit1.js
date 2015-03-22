//// [symbolDeclarationEmit1.ts]
class C {
    [Symbol.isRegExp]: number;
}

//// [symbolDeclarationEmit1.js]
class C {
}


//// [symbolDeclarationEmit1.d.ts]
declare class C {
    [Symbol.isRegExp]: number;
}
