// @filename: controlFlowJSClassProperty.js
// @checkJs: true
// @strict: true
// @outdir: dist
// @declaration: true
export class C {
  name = "CompileDiagnostic";

  /**
   * @param {[number, number] | undefined} position
   */
  constructor(position) {
    if (position) {
      this.position = position;
    }
  }
}
var c = new C([1, 2]);
c.position;
