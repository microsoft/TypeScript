//// [tests/cases/compiler/declarationEmitClassAccessorsJs1.ts] ////

//// [index.js]
// https://github.com/microsoft/TypeScript/issues/58167

export class VFile {
  /**
   * @returns {string}
   */
  get path() {
    return ''
  }

  /**
   * @param {URL | string} path
   */
  set path(path) {
  }
}




//// [index.d.ts]
// https://github.com/microsoft/TypeScript/issues/58167
export declare class VFile {
    /**
     * @returns {string}
     */
    get path(): string;
    /**
     * @param {URL | string} path
     */
    set path(path: URL | string);
}
