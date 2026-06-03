//// [tests/cases/compiler/jsxPragmaAfterTokenSameLine.tsx] ////

//// [jsxPragmaAfterTokenSameLine.tsx]
/** Authored by foo@example.com @jsx h */
declare var h: any;
declare var React: any;
declare var Fragment: any;
declare namespace JSX {
    interface Element {}
}

const x = <Fragment></Fragment>;


//// [jsxPragmaAfterTokenSameLine.js]
"use strict";
const x = React.createElement(Fragment, null);
