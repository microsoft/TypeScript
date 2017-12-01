//// [file.tsx]
import React = require('react')

interface MyComponentProp {
    values: string;
}

function MyComponent<T = MyComponentProp>(attr: T) {
    return <div>attr.values</div>
}

// OK
let i = <MyComponent values />;  // We infer type arguments here
let i1 = <MyComponent values="Hello"/>;

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    function MyComponent(attr) {
        return <div>attr.values</div>;
    }
    // OK
    var i = <MyComponent values/>; // We infer type arguments here
    var i1 = <MyComponent values="Hello"/>;
});
