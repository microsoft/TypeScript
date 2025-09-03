//// [tests/cases/conformance/jsx/tsxGenericAttributesType8.tsx] ////

//// [file.tsx]
import React = require('react');

declare function Component<T>(props: T) : JSX.Element;
const decorator = function <U>(props: U) {
    return <Component {...props} />;
}

const decorator1 = function <U extends {x: string}>(props: U) {
    return <Component {...props} />;
}

//// [file.jsx]
const decorator = function (props) {
    return <Component {...props}/>;
};
const decorator1 = function (props) {
    return <Component {...props}/>;
};
export {};
