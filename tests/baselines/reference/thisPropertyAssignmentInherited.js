//// [tests/cases/conformance/salsa/thisPropertyAssignmentInherited.ts] ////

//// [thisPropertyAssignmentInherited.js]
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





//// [thisPropertyAssignmentInherited.d.ts]
export class Element {
    set textContent(x: string);
    /**
     * @returns {String}
     */
    get textContent(): string;
    cloneNode(): this;
}
export class HTMLElement extends Element {
}
export class TextElement extends HTMLElement {
    set innerHTML(html: string);
    get innerHTML(): string;
    toString(): void;
}
