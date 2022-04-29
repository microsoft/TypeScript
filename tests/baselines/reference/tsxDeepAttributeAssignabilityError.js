//// [tests/cases/compiler/tsxDeepAttributeAssignabilityError.tsx] ////

//// [my-component.tsx]
import * as React from 'react'

interface MyProps {
    x: string;
    y: MyInnerProps;
}

interface MyInnerProps {
    value: string;
}

export function MyComponent(_props: MyProps) {
    return <span>my component</span>;
}

//// [file1.tsx]
import * as React from 'react'
import { MyComponent } from './my-component'

export const result = <MyComponent x="yes" y={{
    value: 42
}} />;


//// [my-component.js]
"use strict";
exports.__esModule = true;
exports.MyComponent = void 0;
var React = require("react");
function MyComponent(_props) {
    return React.createElement("span", null, "my component");
}
exports.MyComponent = MyComponent;
//// [file1.js]
"use strict";
exports.__esModule = true;
exports.result = void 0;
var React = require("react");
var my_component_1 = require("./my-component");
exports.result = React.createElement(my_component_1.MyComponent, { x: "yes", y: {
        value: 42
    } });
