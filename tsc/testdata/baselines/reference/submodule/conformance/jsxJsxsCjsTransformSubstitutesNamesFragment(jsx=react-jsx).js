//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformSubstitutesNamesFragment.tsx] ////

//// [jsxJsxsCjsTransformSubstitutesNamesFragment.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div></div>
</>

export {};

//// [jsxJsxsCjsTransformSubstitutesNamesFragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const a = <>
  <p></p>
  text
  <div></div>
</>;
