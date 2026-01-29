//// [tests/cases/compiler/anonymousClassDeclarationDoesntPrintWithReadonly.ts] ////

//// [anonymousClassDeclarationDoesntPrintWithReadonly.ts]
export class X {
    constructor(readonly a: number) { }
}

export function y() {
    return class extends X { }
}

//// [anonymousClassDeclarationDoesntPrintWithReadonly.js]
export class X {
    constructor(a) {
        this.a = a;
    }
}
export function y() {
    return class extends X {
    };
}


//// [anonymousClassDeclarationDoesntPrintWithReadonly.d.ts]
export declare class X {
    readonly a: number;
    constructor(a: number);
}
export declare function y(): {
    new (a: number): {
        readonly a: number;
    };
};
