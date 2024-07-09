// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
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
// OK - always valid to specify 'key'
let b = <Greet key="k" />;
// Error - not allowed to specify 'ref' on SFCs
let c = <Greet ref="myRef" />;


// OK - ref is valid for classes
let d = <BigGreeter ref={x => x.greeting.substr(10)} />;
// Error ('subtr' not on string)
let e = <BigGreeter ref={x => x.greeting.subtr(10)} />;
// Error (ref callback is contextually typed)
let f = <BigGreeter ref={x => x.notARealProperty} />;

// OK - key is always valid
let g = <BigGreeter key={100} />;

// OK - contextually typed intrinsic ref callback parameter
let h = <div ref={x => x.innerText} />;
// Error - property not on ontextually typed intrinsic ref callback parameter
let i = <div ref={x => x.propertyNotOnHtmlDivElement} />;

