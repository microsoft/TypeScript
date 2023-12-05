//// [tests/cases/conformance/jsx/tsxNamespacedTagName1.tsx] ////

//// [a.tsx]
const a = <svg:path></svg:path>;
const b = <svg : path></svg : path>;
const c = <A:foo></A:foo>;
const d = <a:foo></a:foo>;


//// [a.jsx]
var a = <svg:path></svg:path>;
var b = <svg:path></svg:path>;
var c = <A:foo></A:foo>;
var d = <a:foo></a:foo>;
