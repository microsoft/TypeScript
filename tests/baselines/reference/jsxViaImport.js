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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="component.d.ts" />
const BaseComponent = require("BaseComponent");
class TestComponent extends React.Component {
    render() {
        return <BaseComponent />;
    }
}
