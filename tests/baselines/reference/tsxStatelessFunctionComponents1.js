//// [file.tsx]

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


//// [file.jsx]
function Greet(x) {
    return <div>Hello, {x}</div>;
}
function Meet(_a) {
    var _b = _a.name, name = _b === void 0 ? 'world' : _b;
    return <div>Hello, {name}</div>;
}
// OK
var a = <Greet name='world'/>;
// Error
var b = <Greet naaame='world'/>;
// OK
var c = <Meet />;
// OK
var d = <Meet name='me'/>;
// Error
var e = <Meet name={42}/>;
// Error
var f = <Meet naaaaaaame='no'/>;
