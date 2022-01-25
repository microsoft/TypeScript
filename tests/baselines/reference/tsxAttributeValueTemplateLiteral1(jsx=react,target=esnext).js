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
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const React = __require("react");
function Comp(p) {
    return React.createElement("div", null, p.foo);
}
const a = 42;
React.createElement(Comp, { foo: `foo` });
React.createElement(Comp, { foo: `foo${a}` });
React.createElement(Comp, { foo: `foo${a}foo` });
