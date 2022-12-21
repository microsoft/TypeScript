// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: interface.ts
export interface Encoder<T> {
    encode(value: T): Uint8Array
}
// @filename: lib.js
/**
 * @template T
 * @implements {IEncoder<T>}
 */
export class Encoder {
    /**
     * @param {T} value 
     */
    encode(value) {
        return new Uint8Array(0)
    }
}


/**
 * @template T
 * @typedef {import('./interface').Encoder<T>} IEncoder
 */