//// [file.tsx]

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



//// [file.jsx]
function Greet(x) {
    return <div>Hello, {x}</div>;
}
function Meet(_a) {
    var _b = _a.name, name = _b === void 0 ? 'world' : _b;
    return <div>Hello, {name}</div>;
}
function MeetAndGreet(k) {
    return <div>Hi Hi</div>;
}
// OK
var a = <Greet name='world'/>;
var a1 = <Greet name='world' extra-prop/>;
// Error
var b = <Greet naaame='world'/>;
// OK
var c = <Meet />;
var c1 = <Meet extra-prop/>;
// OK
var d = <Meet name='me'/>;
// Error
var e = <Meet name={42}/>;
// Error
var f = <Meet naaaaaaame='no'/>;
// OK
var g = <MeetAndGreet prop-name="Bob"/>;
// Error
var h = <MeetAndGreet extra-prop-name="World"/>;
