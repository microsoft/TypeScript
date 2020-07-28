//// [constTag2.ts]
/** @const {1} */
var a = 1;

/** @const {1} */
let b = 1;

/** @const {1} */
const c = 1;

/** @const */
var d = 1;

/** @const */
let e = 1;

/** @const */
const f = 1;

a = 2;
b = 2;
c = 2;
d = 2;
e = 2;
f = 2;

//// [constTag2.js]
/** @const {1} */
var a = 1;
/** @const {1} */
var b = 1;
/** @const {1} */
var c = 1;
/** @const */
var d = 1;
/** @const */
var e = 1;
/** @const */
var f = 1;
a = 2;
b = 2;
c = 2;
d = 2;
e = 2;
f = 2;


//// [constTag2.d.ts]
/** @const {1} */
declare var a: number;
/** @const {1} */
declare let b: number;
/** @const {1} */
declare const c = 1;
/** @const */
declare var d: number;
/** @const */
declare let e: number;
/** @const */
declare const f = 1;
