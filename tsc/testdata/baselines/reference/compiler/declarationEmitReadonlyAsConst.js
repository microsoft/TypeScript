//// [tests/cases/compiler/declarationEmitReadonlyAsConst.ts] ////

//// [declarationEmitReadonlyAsConst.ts]
export const value = {
  method(): string {
    return "a";
  },
  prop: {
    nested: 1,
  },
} as const;


//// [declarationEmitReadonlyAsConst.js]
export const value = {
    method() {
        return "a";
    },
    prop: {
        nested: 1,
    },
};


//// [declarationEmitReadonlyAsConst.d.ts]
export declare const value: {
    readonly method: () => string;
    readonly prop: {
        readonly nested: 1;
    };
};
