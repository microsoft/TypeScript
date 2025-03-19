//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformCustomImport.tsx] ////

//// [jsxJsxsCjsTransformCustomImport.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};

//// [jsxJsxsCjsTransformCustomImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>;
