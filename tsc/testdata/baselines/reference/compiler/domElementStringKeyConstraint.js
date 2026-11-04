//// [tests/cases/compiler/domElementStringKeyConstraint.ts] ////

//// [domElementStringKeyConstraint.ts]
declare function setProperty<T extends Element, K extends keyof T & string>(element: T, property: K, value: T[K]): void;
declare const element: Element;
declare const key: keyof Element;
setProperty(element, key, true);


//// [domElementStringKeyConstraint.js]
"use strict";
setProperty(element, key, true);
