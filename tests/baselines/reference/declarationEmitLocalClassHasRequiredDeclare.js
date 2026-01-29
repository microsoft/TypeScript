//// [tests/cases/compiler/declarationEmitLocalClassHasRequiredDeclare.ts] ////

//// [declarationEmitLocalClassHasRequiredDeclare.ts]
export declare namespace A {
    namespace X { }
}

class X { }

export class A {
    static X = X;
}

export declare namespace Y {

}

export class Y { }

//// [declarationEmitLocalClassHasRequiredDeclare.js]
class X {
}
export class A {
}
A.X = X;
export class Y {
}


//// [declarationEmitLocalClassHasRequiredDeclare.d.ts]
export declare namespace A {
    namespace X { }
}
declare class X {
}
export declare class A {
    static X: typeof X;
}
export declare namespace Y {
}
export declare class Y {
}
export {};
