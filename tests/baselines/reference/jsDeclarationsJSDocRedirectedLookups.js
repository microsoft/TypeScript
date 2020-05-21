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
"use strict";
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
/** @type {String} */ declare const a: string;
/** @type {Number} */ declare const b: number;
/** @type {Boolean} */ declare const c: boolean;
/** @type {Void} */ declare const d: void;
/** @type {Undefined} */ declare const e: undefined;
/** @type {Null} */ declare const f: null;
/** @type {Function} */ declare const g: Function;
/** @type {function} */ declare const h: Function;
/** @type {array} */ declare const i: any[];
/** @type {promise} */ declare const j: Promise<any>;
/** @type {Object<string, string>} */ declare const k: {
    [x: string]: string;
};
/** @type {class} */ declare const l: any;
/** @type {bool} */ declare const m: any;
/** @type {int} */ declare const n: any;
/** @type {float} */ declare const o: any;
/** @type {integer} */ declare const p: any;
/** @type {event} */ declare const q: Event | undefined;
