//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformKeyProp.tsx] ////

//// [jsxJsxsCjsTransformKeyProp.tsx]
/// <reference path="/.lib/react16.d.ts" />
const props = { answer: 42 }
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;

export {};


//// [jsxJsxsCjsTransformKeyProp.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const props = { answer: 42 };
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;
