//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsJSDocRedirectedLookups.ts] ////

//// [index.js]
// these are recognized as TS concepts by the checker
/** @type {String} */const a = "";
/** @type {Number} */const b = 0;
/** @type {Boolean} */const c = true;
/** @type {Void} */const d = undefined;
/** @type {Undefined} */const e = undefined;
/** @type {Null} */const f = null;

/** @type {Function} */const g = () => void 0;
/** @type {function} */const h = () => void 0;
/** @type {array} */const i = [];
/** @type {promise} */const j = Promise.resolve(0);
/** @type {Object<string, string>} */const k = {x: "x"};


// these are not recognized as anything and should just be lookup failures
// ignore the errors to try to ensure they're emitted as `any` in declaration emit
// @ts-ignore
/** @type {class} */const l = true;
// @ts-ignore
/** @type {bool} */const m = true;
// @ts-ignore
/** @type {int} */const n = true;
// @ts-ignore
/** @type {float} */const o = true;
// @ts-ignore
/** @type {integer} */const p = true;

// or, in the case of `event` likely erroneously refers to the type of the global Event object
/** @type {event} */const q = undefined;

//// [index.js]
// these are recognized as TS concepts by the checker
/** @type {String} */ const a = "";
/** @type {Number} */ const b = 0;
/** @type {Boolean} */ const c = true;
/** @type {Void} */ const d = undefined;
/** @type {Undefined} */ const e = undefined;
/** @type {Null} */ const f = null;
/** @type {Function} */ const g = () => void 0;
/** @type {function} */ const h = () => void 0;
/** @type {array} */ const i = [];
/** @type {promise} */ const j = Promise.resolve(0);
/** @type {Object<string, string>} */ const k = { x: "x" };
// these are not recognized as anything and should just be lookup failures
// ignore the errors to try to ensure they're emitted as `any` in declaration emit
// @ts-ignore
/** @type {class} */ const l = true;
// @ts-ignore
/** @type {bool} */ const m = true;
// @ts-ignore
/** @type {int} */ const n = true;
// @ts-ignore
/** @type {float} */ const o = true;
// @ts-ignore
/** @type {integer} */ const p = true;
// or, in the case of `event` likely erroneously refers to the type of the global Event object
/** @type {event} */ const q = undefined;


//// [index.d.ts]
/** @type {String} */ declare const a: String;
/** @type {Number} */ declare const b: Number;
/** @type {Boolean} */ declare const c: Boolean;
/** @type {Void} */ declare const d: Void;
/** @type {Undefined} */ declare const e: Undefined;
/** @type {Null} */ declare const f: Null;
/** @type {Function} */ declare const g: Function;
/** @type {function} */ declare const h: function;
/** @type {array} */ declare const i: array;
/** @type {promise} */ declare const j: promise;
/** @type {Object<string, string>} */ declare const k: Object<string, string>;
/** @type {class} */ declare const l: class;
/** @type {bool} */ declare const m: bool;
/** @type {int} */ declare const n: int;
/** @type {float} */ declare const o: float;
/** @type {integer} */ declare const p: integer;
/** @type {event} */ declare const q: event;
