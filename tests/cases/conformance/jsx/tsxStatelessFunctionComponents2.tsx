// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

function Greet(x: {name?: string}) {
	return <div>Hello, {x}</div>;
}

class BigGreeter extends React.Component<{ name?: string }, {}> {
	render() {
		return <div></div>;
	}
	greeting: string;
}

// OK
let a = <Greet />;
// OK
let b = <Greet key="k" />;
// Error
let c = <Greet ref="myRef" />;


// OK
let d = <BigGreeter ref={x => x.greeting.substr(10)} />;
// Error ('subtr')
let e = <BigGreeter ref={x => x.greeting.subtr(10)} />;
// Error
let f = <BigGreeter ref={x => x.notARealProperty} />;

// OK
let f = <BigGreeter key={100} />;