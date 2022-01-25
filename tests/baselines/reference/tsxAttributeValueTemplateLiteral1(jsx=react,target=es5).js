//// [file.tsx]
import React = require('react');

interface Prop {
    foo: string,
}

function Comp(p: Prop) {
    return <div>{p.foo}</div>;
}

const a = 42;

<Comp foo=`foo` />;
<Comp foo=`foo${a}` />;
<Comp foo=`foo${a}foo` />;


//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Comp(p) {
    return React.createElement("div", null, p.foo);
}
var a = 42;
React.createElement(Comp, { foo: "foo" });
React.createElement(Comp, { foo: "foo".concat(a) });
React.createElement(Comp, { foo: "foo".concat(a, "foo") });
