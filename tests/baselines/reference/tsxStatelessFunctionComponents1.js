//// [tsxStatelessFunctionComponents1.tsx]
declare module JSX {
	interface Element { el: any; }
	interface IntrinsicElements { div: any; }
}


function Greet(x: {name: string}) {
	return <div>Hello, {x}</div>;
}
function Meet({name = 'world'}) {
	return <div>Hello, {x}</div>;
}

// OK
let x = <Greet name='world' />;
// Error
let y = <Greet naaame='world' />;


//// [tsxStatelessFunctionComponents1.jsx]
function Greet(x) {
    return <div>Hello, {x}</div>;
}
function Meet(_a) {
    var _b = _a.name, name = _b === void 0 ? 'world' : _b;
    return <div>Hello, {x}</div>;
}
// OK
var x = <Greet name='world'/>;
// Error
var y = <Greet naaame='world'/>;
