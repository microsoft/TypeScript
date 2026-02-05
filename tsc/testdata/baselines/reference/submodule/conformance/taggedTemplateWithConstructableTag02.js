//// [tests/cases/conformance/es6/templates/taggedTemplateWithConstructableTag02.ts] ////

//// [taggedTemplateWithConstructableTag02.ts]
interface I {
    new (...args: any[]): string;
    new (): number;
}
declare var tag: I;
tag `Hello world!`;

//// [taggedTemplateWithConstructableTag02.js]
"use strict";
tag `Hello world!`;
