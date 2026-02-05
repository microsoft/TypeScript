//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsRestArgsWithThisTypeInJSDocFunction.ts] ////

//// [bug38550.js]
export class Clazz {
  /**
   * @param {function(this:Object, ...*):*} functionDeclaration
   */
  method(functionDeclaration) {}
}


//// [bug38550.js]
export class Clazz {
    /**
     * @param {function(this:Object, ...*):*} functionDeclaration
     */
    method(functionDeclaration) { }
}


//// [bug38550.d.ts]
export declare class Clazz {
    /**
     * @param {function(this:Object, ...*):*} functionDeclaration
     */
    method(functionDeclaration: any): void;
}
