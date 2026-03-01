//// [tests/cases/conformance/jsdoc/typedefOnSemicolonClassElement.ts] ////

//// [typedefOnSemicolonClassElement.js]
export class Preferences {
  /** @typedef {string} A */
  ;
  /** @type {A} */
  a = 'ok'
}


//// [typedefOnSemicolonClassElement.js]
export class Preferences {
    constructor() {
        /** @type {A} */
        this.a = 'ok';
    }
    /** @typedef {string} A */
    ;
}


//// [typedefOnSemicolonClassElement.d.ts]
export class Preferences {
    /** @type {A} */
    a: string;
}
