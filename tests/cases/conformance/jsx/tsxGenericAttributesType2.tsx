// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

const decorator4 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} y={"blah"} ></Component>
};