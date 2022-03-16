//// [symbolDeclarationEmit2.ts]
class C {
    [Symbol.toPrimitive] = "";
}

//// [symbolDeclarationEmit2.js]
var _a;
class C {
    constructor() {
        this[_a] = "";
    }
}
_a = Symbol.toPrimitive;


//// [symbolDeclarationEmit2.d.ts]
declare class C {
    [Symbol.toPrimitive]: string;
}
