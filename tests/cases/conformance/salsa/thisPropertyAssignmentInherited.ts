// @checkJs: true
// @strict: true
// @emitDeclarationOnly: true
// @declaration: true
// @Filename: thisPropertyAssignmentInherited.js
export class Element {
  /**
   * @returns {String}
   */
  get textContent() {
    return  ''
  }
  set textContent(x) {}
  cloneNode() { return this}
}
export class HTMLElement extends Element {}
export class TextElement extends HTMLElement {
  get innerHTML() { return this.textContent; }
  set innerHTML(html) { this.textContent = html; }
  toString() {
  }
}

