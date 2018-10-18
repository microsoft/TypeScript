// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

const decorator = function <T>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props}></Component>
};

const decorator2 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} x={2} ></Component>
};

const decorator3 = function <T extends { x: number }, U extends { x: number } >(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component x={2} {...props} ></Component>
};