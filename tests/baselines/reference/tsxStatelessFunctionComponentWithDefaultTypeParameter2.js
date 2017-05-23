//// [file.tsx]
import React = require('react')

interface MyComponentProp {
    values: string;
}

function MyComponent1<T extends MyComponentProp>(attr: T) {
    return <div>attr.values</div>
}


// Error
let i1 = <MyComponent1 values={5}/>;

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    function MyComponent1(attr) {
        return <div>attr.values</div>;
    }
    // Error
    var i1 = <MyComponent1 values={5}/>;
});
