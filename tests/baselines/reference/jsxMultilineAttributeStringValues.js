//// [tests/cases/compiler/jsxMultilineAttributeStringValues.tsx] ////

//// [jsxMultilineAttributeStringValues.tsx]
const a = <input value="
  foo: 23
"></input>;
const b = <input value='
foo: 23
'></input>;


//// [jsxMultilineAttributeStringValues.jsx]
var a = <input value="
  foo: 23
"></input>;
var b = <input value='
foo: 23
'></input>;
