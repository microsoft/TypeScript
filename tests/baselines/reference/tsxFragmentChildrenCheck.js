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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = MyComponent;
function MyComponent(props) {
    return React.createElement("span", null, "my component");
}
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
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
exports.default = RenderString;
