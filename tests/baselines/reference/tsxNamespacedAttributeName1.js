//// [tests/cases/conformance/jsx/tsxNamespacedAttributeName1.tsx] ////

//// [a.tsx]
const a = <svg:path a:b={1}></svg:path>;
const b = <svg : path a:b={1}></svg : path>;


//// [a.jsx]
var a = <svg:path a:b={1}></svg:path>;
var b = <svg:path a:b={1}></svg:path>;
