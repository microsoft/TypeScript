//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution13.tsx] ////

//// [file.tsx]
import React = require('react');

interface ComponentProps {
    property1: string;
    property2: number;
}

export default function Component(props: ComponentProps) {
    let condition1: boolean;
    if (condition1) {
        return (
            <ChildComponent {...props} />
        );
    }
    else {
        return (<ChildComponent {...props} property1="NewString" />);
    }
}

interface AnotherComponentProps {
    property1: string;
}

function ChildComponent({ property1 }: AnotherComponentProps) {
    return (
        <span>{property1}</span>
    );
}

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
var React = require("react");
function Component(props) {
    var condition1;
    if (condition1) {
        return (<ChildComponent {...props}/>);
    }
    else {
        return (<ChildComponent {...props} property1="NewString"/>);
    }
}
function ChildComponent(_a) {
    var property1 = _a.property1;
    return (<span>{property1}</span>);
}
