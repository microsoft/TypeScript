//// [file.tsx]
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



//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
function Greet(x) {
    return <div>Hello, {x}</div>;
}
var BigGreeter = /** @class */ (function (_super) {
    __extends(BigGreeter, _super);
    function BigGreeter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigGreeter.prototype.render = function () {
        return <div></div>;
    };
    return BigGreeter;
}(React.Component));
// OK
var a = <Greet />;
// OK - always valid to specify 'key'
var b = <Greet key="k"/>;
// Error - not allowed to specify 'ref' on SFCs
var c = <Greet ref="myRef"/>;
// OK - ref is valid for classes
var d = <BigGreeter ref={function (x) { return x.greeting.substr(10); }}/>;
// Error ('subtr' not on string)
var e = <BigGreeter ref={function (x) { return x.greeting.subtr(10); }}/>;
// Error (ref callback is contextually typed)
var f = <BigGreeter ref={function (x) { return x.notARealProperty; }}/>;
// OK - key is always valid
var g = <BigGreeter key={100}/>;
// OK - contextually typed intrinsic ref callback parameter
var h = <div ref={function (x) { return x.innerText; }}/>;
// Error - property not on ontextually typed intrinsic ref callback parameter
var i = <div ref={function (x) { return x.propertyNotOnHtmlDivElement; }}/>;
