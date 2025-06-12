//// [tests/cases/compiler/jsxMultilineAttributeStringValues.tsx] ////

//// [jsxMultilineAttributeStringValues.tsx]
const a = <input value="
  foo: 23
"></input>;
const b = <input value='
foo: 23
'></input>;


//// [jsxMultilineAttributeStringValues.jsx]
const a = <input value="
  foo: 23
"></input>;
const b = <input value='
foo: 23
'></input>;
