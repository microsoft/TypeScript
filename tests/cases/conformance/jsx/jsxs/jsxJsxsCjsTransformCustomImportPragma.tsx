// @jsx: react-jsx,react-jsxdev
// @strict: true
// @module: commonjs
// @filename: preact.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource preact */
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};
// @filename: react.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};