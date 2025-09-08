//// [tests/cases/conformance/jsdoc/seeTag2.ts] ////

//// [seeTag2.ts]
/** @see {} empty*/
const a = ""

/** @see {aaaaaa} unknown name*/
const b = ""

/** @see {?????} invalid */
const c = ""

/** @see c without brace */
const d = ""

/** @see ?????? wowwwwww*/
const e = ""

/** @see {}*/
const f = ""

/** @see */
const g = ""


//// [seeTag2.js]
/** @see {} empty*/
const a = "";
/** @see {aaaaaa} unknown name*/
const b = "";
/** @see {?????} invalid */
const c = "";
/** @see c without brace */
const d = "";
/** @see ?????? wowwwwww*/
const e = "";
/** @see {}*/
const f = "";
/** @see */
const g = "";


//// [seeTag2.d.ts]
/** @see {} empty*/
declare const a = "";
/** @see {aaaaaa} unknown name*/
declare const b = "";
/** @see {?????} invalid */
declare const c = "";
/** @see c without brace */
declare const d = "";
/** @see ?????? wowwwwww*/
declare const e = "";
/** @see {}*/
declare const f = "";
/** @see */
declare const g = "";
