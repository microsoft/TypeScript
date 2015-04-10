//// [symbolDeclarationEmit2.ts]
class C {
    [Symbol.toPrimitive] = "";
}

//// [symbolDeclarationEmit2.js]
class C {
    constructor() {
        this[Symbol.toPrimitive] = "";
    }
}


//// [symbolDeclarationEmit2.d.ts]
declare class C {
    [Symbol.toPrimitive]: string;
}
