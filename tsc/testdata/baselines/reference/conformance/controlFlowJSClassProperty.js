//// [tests/cases/conformance/salsa/controlFlowJSClassProperty.ts] ////

//// [controlFlowJSClassProperty.js]
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


//// [controlFlowJSClassProperty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
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
exports.C = C;
var c = new C([1, 2]);
c.position;


//// [controlFlowJSClassProperty.d.ts]
export declare class C {
    name: string;
    /**
     * @param {[number, number] | undefined} position
     */
    constructor(position: [number, number] | undefined);
}
