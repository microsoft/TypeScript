// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

const decorator4 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} y={"blah"} ></Component>
};