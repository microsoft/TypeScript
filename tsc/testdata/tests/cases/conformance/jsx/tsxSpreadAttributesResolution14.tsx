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