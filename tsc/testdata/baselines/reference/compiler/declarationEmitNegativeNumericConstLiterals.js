//// [tests/cases/compiler/declarationEmitNegativeNumericConstLiterals.ts] ////

//// [declarationEmitNegativeNumericConstLiterals.ts]
declare function id<const T>(value: T): T;

export const a = -1e500 as const;
export const b = -123456789012345678901234567890 as const;
export const c = ((-1e500)) as const;
export const d = { value: -1e500 } as const;
export const e = [-1e500] as const;
export const f = id(-1e500);
export const g = -1e500;
export const h = 1e500;
export const i = { [-1e500]: 1 } as const;


//// [declarationEmitNegativeNumericConstLiterals.js]
export const a = -1e500;
export const b = -123456789012345678901234567890;
export const c = ((-1e500));
export const d = { value: -1e500 };
export const e = [-1e500];
export const f = id(-1e500);
export const g = -1e500;
export const h = 1e500;
export const i = { [-1e500]: 1 };


//// [declarationEmitNegativeNumericConstLiterals.d.ts]
export declare const a: -Infinity;
export declare const b: -1.2345678901234568e+29;
export declare const c: -Infinity;
export declare const d: {
    readonly value: -Infinity;
};
export declare const e: readonly [-Infinity];
export declare const f: -Infinity;
export declare const g = -Infinity;
export declare const h = Infinity;
export declare const i: {
    readonly [-Infinity]: 1;
};


//// [DtsFileErrors]


declarationEmitNegativeNumericConstLiterals.d.ts(1,25): error TS1110: Type expected.
declarationEmitNegativeNumericConstLiterals.d.ts(3,25): error TS1110: Type expected.
declarationEmitNegativeNumericConstLiterals.d.ts(5,21): error TS1110: Type expected.
declarationEmitNegativeNumericConstLiterals.d.ts(6,1): error TS1128: Declaration or statement expected.
declarationEmitNegativeNumericConstLiterals.d.ts(7,35): error TS1110: Type expected.
declarationEmitNegativeNumericConstLiterals.d.ts(7,44): error TS1005: ';' expected.
declarationEmitNegativeNumericConstLiterals.d.ts(8,25): error TS1110: Type expected.


==== declarationEmitNegativeNumericConstLiterals.d.ts (7 errors) ====
    export declare const a: -Infinity;
                            ~
!!! error TS1110: Type expected.
    export declare const b: -1.2345678901234568e+29;
    export declare const c: -Infinity;
                            ~
!!! error TS1110: Type expected.
    export declare const d: {
        readonly value: -Infinity;
                        ~
!!! error TS1110: Type expected.
    };
    ~
!!! error TS1128: Declaration or statement expected.
    export declare const e: readonly [-Infinity];
                                      ~
!!! error TS1110: Type expected.
                                               ~
!!! error TS1005: ';' expected.
    export declare const f: -Infinity;
                            ~
!!! error TS1110: Type expected.
    export declare const g = -Infinity;
    export declare const h = Infinity;
    export declare const i: {
        readonly [-Infinity]: 1;
    };
    