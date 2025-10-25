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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="component.d.ts" />
const BaseComponent_1 = require("BaseComponent");
class TestComponent extends React.Component {
    render() {
        return <BaseComponent_1.default />;
    }
}
