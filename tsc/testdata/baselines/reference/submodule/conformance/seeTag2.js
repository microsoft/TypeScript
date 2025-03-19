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
