//// [tests/cases/conformance/jsx/tsxGenericAttributesType5.tsx] ////

//// [file.tsx]
import React = require('react');

class B1<T extends { x: string }> extends React.Component<T, {}> {
    render() {
        return <div>hi</div>; 
    }
}
class B<U> extends React.Component<U, {}> {
    props: U;
    render() {
        return <B1 {...this.props} x="hi" />;
    }
}

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class B1 extends React.Component {
    render() {
        return <div>hi</div>;
    }
}
class B extends React.Component {
    props;
    render() {
        return <B1 {...this.props} x="hi"/>;
    }
}
