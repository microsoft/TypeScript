//// [tests/cases/compiler/jsxViaImport.tsx] ////

//// [component.d.ts]

declare module JSX {
  interface ElementAttributesProperty { props; }
}
declare module React {
  class Component<T, U> { }
}
declare module "BaseComponent" {
    var base: React.Component<any, {}>;
    export = base;
}

//// [consumer.tsx]
/// <reference path="component.d.ts" />
import BaseComponent = require('BaseComponent');
class TestComponent extends React.Component<any, {}> {
    render() {
        return <BaseComponent />;
    }
}


//// [consumer.jsx]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="component.d.ts" />
var BaseComponent = require('BaseComponent');
var TestComponent = (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        _super.apply(this, arguments);
    }
    TestComponent.prototype.render = function () {
        return <BaseComponent />;
    };
    return TestComponent;
})(React.Component);
