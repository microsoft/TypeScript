//// [tests/cases/compiler/declarationEmitEscapedSymbolNames.ts] ////

//// [declarationEmitEscapedSymbolNames.ts]
export class T {
    static readonly "\t" = Symbol()
}

export let x = { [T['\t']]: 1 }


//// [declarationEmitEscapedSymbolNames.js]
export class T {
    static "\t" = Symbol();
}
export let x = { [T['\t']]: 1 };


//// [declarationEmitEscapedSymbolNames.d.ts]
export declare class T {
    static readonly "\t": unique symbol;
}
export declare let x: {
    [T["\t"]]: number;
};


//// [DtsFileErrors]


declarationEmitEscapedSymbolNames.d.ts(5,5): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.


==== declarationEmitEscapedSymbolNames.d.ts (1 errors) ====
    export declare class T {
        static readonly "\t": unique symbol;
    }
    export declare let x: {
        [T["\t"]]: number;
        ~~~~~~~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
    };
    