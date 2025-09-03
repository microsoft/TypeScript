//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReusesExistingNodesMappingJSDocTypes.ts] ////

//// [index.js]
/** @type {?} */
export const a = null;

/** @type {*} */
export const b = null;

/** @type {string?} */
export const c = null;

/** @type {string=} */
export const d = null;

/** @type {string!} */
export const e = null;

/** @type {function(string, number): object} */
export const f = null;

/** @type {function(new: object, string, number)} */
export const g = null;

/** @type {Object.<string, number>} */
export const h = null;


//// [index.js]
/** @type {?} */
export const a = null;
/** @type {*} */
export const b = null;
/** @type {string?} */
export const c = null;
/** @type {string=} */
export const d = null;
/** @type {string!} */
export const e = null;
/** @type {function(string, number): object} */
export const f = null;
/** @type {function(new: object, string, number)} */
export const g = null;
/** @type {Object.<string, number>} */
export const h = null;


//// [index.d.ts]
/** @type {?} */
export const a: unknown;
/** @type {*} */
export const b: any;
/** @type {string?} */
export const c: string | null;
/** @type {string=} */
export const d: string | undefined;
/** @type {string!} */
export const e: string;
/** @type {function(string, number): object} */
export const f: (arg0: string, arg1: number) => object;
/** @type {function(new: object, string, number)} */
export const g: new (arg1: string, arg2: number) => object;
/** @type {Object.<string, number>} */
export const h: {
    [x: string]: number;
};
