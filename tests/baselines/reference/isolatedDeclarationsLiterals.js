//// [tests/cases/compiler/isolatedDeclarationsLiterals.ts] ////

//// [file1.ts]
export const constObject = {
    /** Value Of 1 */
    one: 1,
    /** Value Of 0o1 */
    oneOctal: 0o1,
    /** Value Of 0x1 */
    oneHex: 0x1,
    /** Value Of +1 */
    pOne: +1,
    /** Value Of -1 */
    mOne: -1,
    array: [1, -1, 1n, -1n],
    /** Value Of 1n */
    onen: 1n,
    /** Value Of -1n */
    mOnen: -1n,

    /** Value Of "1" */
    oneStrDoubleQuote: "1",
    /** Value Of '1' */
    oneStrSingleQuote: '1',
    /** Value Of `1` */
    oneStrTemplate: `1`,
    /** A method */
    method(): void {

    },
} as const;

export const one = 1;
export const oneOctal = 0o1;
export const oneHex = 0x1;
export const pOne = +1;
export const mOne = -1;
export const onen = 1n;
export const mOnen = -1n;
export const oneStrDoubleQuote = "1";
export const oneStrSingleQuote = '1';
export const oneStrTemplate = `1`;

export const mutableObject = {
    /** Value Of 1 */
    one: 1,
    /** Value Of 0o1 */
    oneOctal: 0o1,
    /** Value Of 0x1 */
    oneHex: 0x1,
    /** Value Of +1 */
    pOne: +1,
    /** Value Of -1 */
    mOne: -1,
    /** Value Of 1n */
    onen: 1n,
    /** Value Of -1n */
    mOnen: -1n,
    /** A method */
    method(): void {

    },
};




//// [file1.js]
export const constObject = {
    /** Value Of 1 */
    one: 1,
    /** Value Of 0o1 */
    oneOctal: 0o1,
    /** Value Of 0x1 */
    oneHex: 0x1,
    /** Value Of +1 */
    pOne: +1,
    /** Value Of -1 */
    mOne: -1,
    array: [1, -1, 1n, -1n],
    /** Value Of 1n */
    onen: 1n,
    /** Value Of -1n */
    mOnen: -1n,
    /** Value Of "1" */
    oneStrDoubleQuote: "1",
    /** Value Of '1' */
    oneStrSingleQuote: '1',
    /** Value Of `1` */
    oneStrTemplate: `1`,
    /** A method */
    method() {
    },
};
export const one = 1;
export const oneOctal = 0o1;
export const oneHex = 0x1;
export const pOne = +1;
export const mOne = -1;
export const onen = 1n;
export const mOnen = -1n;
export const oneStrDoubleQuote = "1";
export const oneStrSingleQuote = '1';
export const oneStrTemplate = `1`;
export const mutableObject = {
    /** Value Of 1 */
    one: 1,
    /** Value Of 0o1 */
    oneOctal: 0o1,
    /** Value Of 0x1 */
    oneHex: 0x1,
    /** Value Of +1 */
    pOne: +1,
    /** Value Of -1 */
    mOne: -1,
    /** Value Of 1n */
    onen: 1n,
    /** Value Of -1n */
    mOnen: -1n,
    /** A method */
    method() {
    },
};


//// [file1.d.ts]
export declare const constObject: {
    /** Value Of 1 */
    readonly one: 1;
    /** Value Of 0o1 */
    readonly oneOctal: 1;
    /** Value Of 0x1 */
    readonly oneHex: 1;
    /** Value Of +1 */
    readonly pOne: 1;
    /** Value Of -1 */
    readonly mOne: -1;
    readonly array: readonly [1, -1, 1n, -1n];
    /** Value Of 1n */
    readonly onen: 1n;
    /** Value Of -1n */
    readonly mOnen: -1n;
    /** Value Of "1" */
    readonly oneStrDoubleQuote: "1";
    /** Value Of '1' */
    readonly oneStrSingleQuote: "1";
    /** Value Of `1` */
    readonly oneStrTemplate: "1";
    /** A method */
    readonly method: () => void;
};
export declare const one = 1;
export declare const oneOctal = 1;
export declare const oneHex = 1;
export declare const pOne = 1;
export declare const mOne = -1;
export declare const onen = 1n;
export declare const mOnen = -1n;
export declare const oneStrDoubleQuote = "1";
export declare const oneStrSingleQuote = "1";
export declare const oneStrTemplate = "1";
export declare const mutableObject: {
    /** Value Of 1 */
    one: number;
    /** Value Of 0o1 */
    oneOctal: number;
    /** Value Of 0x1 */
    oneHex: number;
    /** Value Of +1 */
    pOne: number;
    /** Value Of -1 */
    mOne: number;
    /** Value Of 1n */
    onen: bigint;
    /** Value Of -1n */
    mOnen: bigint;
    /** A method */
    method(): void;
};
