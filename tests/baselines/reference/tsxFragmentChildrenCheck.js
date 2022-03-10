//// [tests/cases/compiler/tsxFragmentChildrenCheck.ts] ////

//// [my-component.tsx]
declare var React: any;

export function MyComponent(props: any) {
    return <span>my component</span>;
}

//// [file1.tsx]
import * as React from 'react'
import { MyComponent } from './my-component'

const MY_STRING: string = 'Ceci n\'est pas une string.'
const MY_CLASSNAME: string = 'jeclass'

class RenderString extends React.PureComponent<any, any> {
  render() {
    return (
      <>
        <MyComponent />
        <span>{ MY_STRING }</span>
        <span className={ MY_CLASSNAME } />
      </>
    )
  }
}

export default RenderString

//// [my-component.js]
"use strict";
exports.__esModule = true;
exports.MyComponent = void 0;
function MyComponent(props) {
    return React.createElement("span", null, "my component");
}
exports.MyComponent = MyComponent;
//// [file1.js]
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
var my_component_1 = require("./my-component");
var MY_STRING = 'Ceci n\'est pas une string.';
var MY_CLASSNAME = 'jeclass';
var RenderString = /** @class */ (function (_super) {
    __extends(RenderString, _super);
    function RenderString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderString.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(my_component_1.MyComponent, null),
            React.createElement("span", null, MY_STRING),
            React.createElement("span", { className: MY_CLASSNAME })));
    };
    return RenderString;
}(React.PureComponent));
exports["default"] = RenderString;
