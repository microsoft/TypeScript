//// [tests/cases/compiler/jsxViaImport.2.tsx] ////

//// [component.d.ts]
declare module JSX {
  interface ElementAttributesProperty { props; }
}
declare module React {
  class Component<T, U> { }
}
declare module "BaseComponent" {
    export default class extends React.Component<any, {}> {
    }
}

//// [consumer.tsx]
/// <reference path="component.d.ts" />
import BaseComponent from 'BaseComponent';
class TestComponent extends React.Component<any, {}> {
    render() {
        return <BaseComponent />;
    }
}


//// [consumer.jsx]
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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="component.d.ts" />
var BaseComponent_1 = require("BaseComponent");
var TestComponent = /** @class */ (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestComponent.prototype.render = function () {
        return <BaseComponent_1.default />;
    };
    return TestComponent;
}(React.Component));
