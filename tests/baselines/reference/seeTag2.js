//// [seeTag2.ts]
/** @see {} empty*/
const a = ""

/** @see {aaaaaa} unknown name*/
const b = ""

/** @see {?????} invalid */
const c = ""

/** @see c without brace */
const d = ""

/** @see ?????? */
const e = ""


//// [seeTag2.js]
/** @see {} empty*/
var a = "";
/** @see {aaaaaa} unknown name*/
var b = "";
/** @see {?????} invalid */
var c = "";
/** @see c without brace */
var d = "";
/** @see ?????? */
var e = "";


//// [seeTag2.d.ts]
/** @see {} empty*/
declare const a = "";
/** @see {aaaaaa} unknown name*/
declare const b = "";
/** @see {?????} invalid */
declare const c = "";
/** @see c without brace */
declare const d = "";
/** @see ?????? */
declare const e = "";
