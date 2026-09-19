//// [tests/cases/compiler/cssStyleDeclarationKebabCaseIndex.ts] ////

//// [cssStyleDeclarationKebabCaseIndex.ts]
declare const el: HTMLElement;

const value = getComputedStyle(el)["background-color"];
el.style["background-color"] = "red";


//// [cssStyleDeclarationKebabCaseIndex.js]
"use strict";
const value = getComputedStyle(el)["background-color"];
el.style["background-color"] = "red";
