//// [tsxStatelessFunctionComponents2.tsx]

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

//// [tsxStatelessFunctionComponents2.jsx]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
function Greet(x) {
    return <div>Hello, {x}</div>;
}
var BigGreeter = (function (_super) {
    __extends(BigGreeter, _super);
    function BigGreeter() {
        _super.apply(this, arguments);
    }
    BigGreeter.prototype.render = function () {
        return <div></div>;
    };
    return BigGreeter;
})(React.Component);
// OK
var a = <Greet />;
// OK
var b = <Greet key="k"/>;
// Error
var c = <Greet ref="myRef"/>;
// OK
var d = <BigGreeter ref={function (x) { return x.greeting.substr(10); }}/>;
// Error ('subtr')
var e = <BigGreeter ref={function (x) { return x.greeting.subtr(10); }}/>;
// Error
var f = <BigGreeter ref={function (x) { return x.notARealProperty; }}/>;
// OK
var f = <BigGreeter key={100}/>;
