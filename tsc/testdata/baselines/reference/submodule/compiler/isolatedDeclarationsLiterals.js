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
    one: 1,
    oneOctal: 0o1,
    oneHex: 0x1,
    pOne: +1,
    mOne: -1,
    array: [1, -1, 1n, -1n],
    onen: 1n,
    mOnen: -1n,
    oneStrDoubleQuote: "1",
    oneStrSingleQuote: '1',
    oneStrTemplate: `1`,
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
    one: 1,
    oneOctal: 0o1,
    oneHex: 0x1,
    pOne: +1,
    mOne: -1,
    onen: 1n,
    mOnen: -1n,
    method() {
    },
};
