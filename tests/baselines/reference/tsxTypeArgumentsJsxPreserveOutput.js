//// [foo.tsx]
import React = require('react');

type TypeProps = { foo?: boolean; };
interface InterfaceProps { foo?: boolean; }

function Foo<T>() {
    return null;
}

<>
    <Foo<unknown> />
    <Foo<string> />
    <Foo<boolean> />
    <Foo<object> />
    <Foo<null> />
    <Foo<any> />
    <Foo<never> />
    <Foo<undefined> />
    <Foo<TypeProps> />
    <Foo<InterfaceProps> />
</>

//// [foo.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
function Foo() {
    return null;
}
<>
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
    <Foo />
</>;
