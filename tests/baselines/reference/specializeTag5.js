//// [tests/cases/conformance/jsdoc/specializeTag5.ts] ////

//// [specializeTag5.js]
const fileInput1 =
    /** @specialize {HTMLInputElement} */
    (document.querySelector("input[type=file]"))

/** @specialize {HTMLInputElement} */
const fileInput2 =
    document.querySelector("input[type=file]")


//// [specializeTag5.js]
var fileInput1 = 
/** @specialize {HTMLInputElement} */
(document.querySelector("input[type=file]"));
/** @specialize {HTMLInputElement} */
var fileInput2 = document.querySelector("input[type=file]");


//// [specializeTag5.d.ts]
declare const fileInput1: HTMLInputElement;
/** @specialize {HTMLInputElement} */
declare const fileInput2: HTMLInputElement;
