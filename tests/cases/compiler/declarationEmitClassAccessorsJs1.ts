// @strict: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: index.js

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
