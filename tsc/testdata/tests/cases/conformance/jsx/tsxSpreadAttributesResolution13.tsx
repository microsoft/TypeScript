// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

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