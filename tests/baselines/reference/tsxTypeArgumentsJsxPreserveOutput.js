//// [foo.tsx]
import React = require('react');

type TypeProps = { foo?: boolean; };
interface InterfaceProps { foo?: boolean; }

function Foo<T>() {
    return null;
}

<>
    {/* JsxSelfClosingElement */}
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

    {/* JsxOpeningElement */}
    <Foo<unknown>></Foo>
    <Foo<string>></Foo>
    <Foo<boolean>></Foo>
    <Foo<object>></Foo>
    <Foo<null>></Foo>
    <Foo<any>></Foo>
    <Foo<never>></Foo>
    <Foo<undefined>></Foo>
    <Foo<TypeProps>></Foo>
    <Foo<InterfaceProps>></Foo>
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

    
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
    <Foo></Foo>
</>;
