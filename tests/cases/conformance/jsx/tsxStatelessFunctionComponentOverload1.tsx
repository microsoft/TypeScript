// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

declare function OneThing(k: {yxx: string}): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string}): JSX.Element;

// OK
const c1 = <OneThing yxx='ok' />
const c2 = <OneThing yy={100}  yy1="hello"/>