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
export declare class Element {
    /**
     * @returns {String}
     */
    get textContent(): string;
    set textContent(x: string);
    cloneNode(): this;
}
export declare class HTMLElement extends Element {
}
export declare class TextElement extends HTMLElement {
    get innerHTML(): string;
    set innerHTML(html: string);
    toString(): void;
}
