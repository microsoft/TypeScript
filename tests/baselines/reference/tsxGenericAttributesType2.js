//// [tests/cases/conformance/jsx/tsxGenericAttributesType2.tsx] ////

//// [file.tsx]
import React = require('react');

const decorator4 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} y={"blah"} ></Component>
};

//// [file.jsx]
const decorator4 = function (Component) {
    return (props) => <Component {...props} y={"blah"}></Component>;
};
export {};
