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
function MeetAndGreet(k: {"prop-name": string}) {
	return <div>Hi Hi</div>;
}

// OK
let a = <Greet name='world' />;
let a1 = <Greet name='world' extra-prop />;
// Error
let b = <Greet naaame='world' />;

// OK
let c = <Meet />;
let c1 = <Meet extra-prop/>;
// OK
let d = <Meet name='me' />;
// Error
let e = <Meet name={42} />;
// Error
let f = <Meet naaaaaaame='no' />;

// OK
let g = <MeetAndGreet prop-name="Bob" />;
// Error
let h = <MeetAndGreet extra-prop-name="World" />;

