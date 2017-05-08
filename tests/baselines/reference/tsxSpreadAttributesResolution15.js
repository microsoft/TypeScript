//// [file.tsx]
import React = require('react');

interface ComponentProps {
    property1: string;
    property2: number;
}

export default function Component(props: ComponentProps) {
    return (
        <AnotherComponent {...props} property2 AnotherProperty1="hi"/>
    );
}

interface AnotherComponentProps {
    property1: string;
    AnotherProperty1: string;
    property2: boolean;
}

function AnotherComponent({ property1 }: AnotherComponentProps) {
    return (
        <span>{property1}</span>
    );
}

//// [file.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
function Component(props) {
    return (<AnotherComponent {...props} property2 AnotherProperty1="hi"/>);
}
exports["default"] = Component;
function AnotherComponent(_a) {
    var property1 = _a.property1;
    return (<span>{property1}</span>);
}
