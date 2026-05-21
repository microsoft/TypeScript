//// [tests/cases/compiler/jsxPragmaAfterTags.tsx] ////

//// [jsxPragmaAfterTags.tsx]
/**
 * @fileoverview comment
 * @jsx h
 */
declare var h: any;
declare var Fragment: any;
declare namespace JSX {
    interface Element {}
}

const x = <Fragment></Fragment>;


//// [jsxPragmaAfterTags.js]
"use strict";
const x = h(Fragment, null);
