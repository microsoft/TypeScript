//// [tests/cases/conformance/jsx/tsxNamespacedTagName1.tsx] ////

//// [a.tsx]
const a = <svg:path></svg:path>;
const b = <svg : path></svg : path>;
const c = <A:foo></A:foo>;
const d = <a:foo></a:foo>;


//// [a.jsx]
const a = <svg:path></svg:path>;
const b = <svg:path></svg:path>;
const c = <A:foo></A:foo>;
const d = <a:foo></a:foo>;
