//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformCustomImportPragma.tsx] ////

//// [preact.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource preact */
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};
//// [react.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};

//// [preact.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>;
//// [react.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./preact");
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>;
