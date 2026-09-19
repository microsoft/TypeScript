//// [tests/cases/compiler/domHTMLElementOnError.ts] ////

//// [domHTMLElementOnError.ts]
declare const htmlElement: HTMLElement;

htmlElement.onerror = (event: Event) => {};
htmlElement.onerror = (event: UIEvent) => {};
htmlElement.addEventListener("error", (event: Event) => {});
htmlElement.addEventListener("error", (event: UIEvent) => {});

declare const win: Window;

win.onerror = (event, source, lineno, colno, error) => {};
win.addEventListener("error", (event: ErrorEvent) => {});


//// [domHTMLElementOnError.js]
"use strict";
htmlElement.onerror = (event) => { };
htmlElement.onerror = (event) => { };
htmlElement.addEventListener("error", (event) => { });
htmlElement.addEventListener("error", (event) => { });
win.onerror = (event, source, lineno, colno, error) => { };
win.addEventListener("error", (event) => { });
