//// [jsxMultilineAttributeValuesReact.tsx]
declare var React: any;
const a = <input value="
foo: 23
"></input>;
const b = <input value='
foo: 23
'></input>;
const c = <input value='
foo: 23\n
'></input>;


//// [jsxMultilineAttributeValuesReact.js]
var a = React.createElement("input", { value: "\nfoo: 23\n" });
var b = React.createElement("input", { value: '\nfoo: 23\n' });
var c = React.createElement("input", { value: '\nfoo: 23\\n\n' });
