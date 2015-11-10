// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

function Greet(x: {name: string}) {
	return <div>Hello, {x}</div>;
}
function Meet({name = 'world'}) {
	return <div>Hello, {name}</div>;
}

// OK
let a = <Greet name='world' />;
// Error
let b = <Greet naaame='world' />;

// OK
let c = <Meet />;
// OK
let d = <Meet name='me' />;
// Error
let e = <Meet name={42} />;
// Error
let f = <Meet naaaaaaame='no' />;
