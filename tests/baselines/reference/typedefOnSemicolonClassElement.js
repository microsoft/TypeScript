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
    /** @typedef {string} A */
    ;
    /** @type {A} */
    a = 'ok';
}


//// [typedefOnSemicolonClassElement.d.ts]
export class Preferences {
    /** @type {A} */
    a: string;
}
