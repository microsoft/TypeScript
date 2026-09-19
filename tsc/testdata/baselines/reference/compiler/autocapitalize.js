//// [tests/cases/compiler/autocapitalize.ts] ////

//// [autocapitalize.ts]
declare const element: HTMLElement;

element.autocapitalize = "off";
element.autocapitalize = "none";
element.autocapitalize = "on";
element.autocapitalize = "sentences";
element.autocapitalize = "words";
element.autocapitalize = "characters";
element.autocapitalize = "character";


//// [autocapitalize.js]
"use strict";
element.autocapitalize = "off";
element.autocapitalize = "none";
element.autocapitalize = "on";
element.autocapitalize = "sentences";
element.autocapitalize = "words";
element.autocapitalize = "characters";
element.autocapitalize = "character";
