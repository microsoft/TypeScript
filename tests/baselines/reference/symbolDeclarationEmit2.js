//// [symbolDeclarationEmit2.ts]
class C {
    [Symbol.isRegExp] = "";
}

//// [symbolDeclarationEmit2.js]
class C {
    constructor() {
        this[Symbol.isRegExp] = "";
    }
}


//// [symbolDeclarationEmit2.d.ts]
declare class C {
    [Symbol.isRegExp]: string;
}
