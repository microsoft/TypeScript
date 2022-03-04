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
/** @type {class} */ declare const l: class;
/** @type {bool} */ declare const m: bool;
/** @type {int} */ declare const n: int;
/** @type {float} */ declare const o: float;
/** @type {integer} */ declare const p: integer;
/** @type {event} */ declare const q: Event | undefined;


//// [DtsFileErrors]


out/index.d.ts(14,39): error TS2304: Cannot find name 'class'.
out/index.d.ts(15,38): error TS2304: Cannot find name 'bool'.
out/index.d.ts(16,37): error TS2304: Cannot find name 'int'.
out/index.d.ts(17,39): error TS2304: Cannot find name 'float'.
out/index.d.ts(18,41): error TS2304: Cannot find name 'integer'.


==== ./out/index.d.ts (5 errors) ====
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
    /** @type {class} */ declare const l: class;
                                          ~~~~~
!!! error TS2304: Cannot find name 'class'.
    /** @type {bool} */ declare const m: bool;
                                         ~~~~
!!! error TS2304: Cannot find name 'bool'.
    /** @type {int} */ declare const n: int;
                                        ~~~
!!! error TS2304: Cannot find name 'int'.
    /** @type {float} */ declare const o: float;
                                          ~~~~~
!!! error TS2304: Cannot find name 'float'.
    /** @type {integer} */ declare const p: integer;
                                            ~~~~~~~
!!! error TS2304: Cannot find name 'integer'.
    /** @type {event} */ declare const q: Event | undefined;
    