//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponents1.tsx] ////

//// [file.tsx]
function EmptyPropSFC() {
    return <div> Default Greeting </div>;
}

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

// Error
let i = <EmptyPropSFC prop1 />
let i1 = <EmptyPropSFC ref={x => x.greeting.substr(10)} />

let o = {
    prop1: true;
}

// OK as access properties are allow when spread
let i2 = <EmptyPropSFC {...o} />

let o1: any;
// OK
let j = <EmptyPropSFC {...o1} />
let j1 = <EmptyPropSFC />
let j2 = <EmptyPropSFC data-prop />
let j3 = <EmptyPropSFC {...{}} />
let j4 = <EmptyPropSFC {...{ "data-info": "hi"}} />



//// [file.jsx]
function EmptyPropSFC() {
    return <div> Default Greeting </div>;
}
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
// Error
var i = <EmptyPropSFC prop1/>;
var i1 = <EmptyPropSFC ref={function (x) { return x.greeting.substr(10); }}/>;
var o = {
    prop1: true
};
// OK as access properties are allow when spread
var i2 = <EmptyPropSFC {...o}/>;
var o1;
// OK
var j = <EmptyPropSFC {...o1}/>;
var j1 = <EmptyPropSFC />;
var j2 = <EmptyPropSFC data-prop/>;
var j3 = <EmptyPropSFC {...{}}/>;
var j4 = <EmptyPropSFC {...{ "data-info": "hi" }}/>;
