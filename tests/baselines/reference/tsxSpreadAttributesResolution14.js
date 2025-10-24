//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution14.tsx] ////

//// [file.tsx]
import React = require('react');

interface ComponentProps {
    property1: string;
    property2: number;
}

export default function Component(props: ComponentProps) {
    return (
        // Error extra property
        <AnotherComponent {...props} Property1/>
    );
}

interface AnotherComponentProps {
    property1: string;
}

function AnotherComponent({ property1 }: AnotherComponentProps) {
    return (
        <span>{property1}</span>
    );
}

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
const React = require("react");
function Component(props) {
    return (
    // Error extra property
    <AnotherComponent {...props} Property1/>);
}
function AnotherComponent({ property1 }) {
    return (<span>{property1}</span>);
}
