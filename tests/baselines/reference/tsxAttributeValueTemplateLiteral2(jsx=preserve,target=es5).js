//// [file.tsx]
import React = require('react');

interface Prop {
    foo: string,
}

function Comp(p: Prop) {
    return <div>{p.foo}</div>;
}

const a = 42;

<Comp foo=`&amp;` />;
<Comp foo={`&amp;`} />;
<Comp foo='&amp;' />;

<Comp foo=`&amp;${a}` />;
<Comp foo={`&amp;${a}`} />;
<Comp foo={'&amp;' + a} />;

<Comp foo=`&amp;${a}&amp;` />;
<Comp foo={`&amp;${a}&amp;`} />;
<Comp foo={'&amp;' + a + '&amp;'} />;


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Comp(p) {
    return <div>{p.foo}</div>;
}
var a = 42;
<Comp foo="&amp;"/>;
<Comp foo={"&amp;"}/>;
<Comp foo='&amp;'/>;
<Comp foo={"&amp;".concat(a)}/>;
<Comp foo={"&amp;".concat(a)}/>;
<Comp foo={'&amp;' + a}/>;
<Comp foo={"&amp;".concat(a, "&amp;")}/>;
<Comp foo={"&amp;".concat(a, "&amp;")}/>;
<Comp foo={'&amp;' + a + '&amp;'}/>;
