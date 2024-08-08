//// [tests/cases/conformance/jsdoc/specializeTag5.ts] ////

//// [specializeTag5.js]
const fileInput1 =
    /** @specialize {HTMLInputElement} */
    (document.querySelector("input[type=file]"))

/** @specialize {HTMLInputElement} */
const fileInput2 =
    document.querySelector("input[type=file]")


//// [specializeTag5.js]
"use strict";
const fileInput1 = 
/** @specialize {HTMLInputElement} */
(document.querySelector("input[type=file]"));
/** @specialize {HTMLInputElement} */
const fileInput2 = document.querySelector("input[type=file]");


//// [specializeTag5.d.ts]
declare const fileInput1: HTMLInputElement | null;
/** @specialize {HTMLInputElement} */
declare const fileInput2: HTMLInputElement | null;
