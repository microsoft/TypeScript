//// [tests/cases/compiler/jsxEntityDecoderAfterNonEntityAmpersand.tsx] ////

//// [jsxEntityDecoderAfterNonEntityAmpersand.tsx]
const a = <div>&&amp;</div>;
const b = <div>a&b&amp;c&d&lt;e</div>;
const c = <div>&amp;&amp;</div>;
const d = <div>&amp;&&amp;</div>;
const e = <div>a&b&c&amp;</div>;


//// [jsxEntityDecoderAfterNonEntityAmpersand.js]
"use strict";
const a = React.createElement("div", null, "&&");
const b = React.createElement("div", null, "a&b&c&d<e");
const c = React.createElement("div", null, "&&");
const d = React.createElement("div", null, "&&&");
const e = React.createElement("div", null, "a&b&c&");
