//// [tests/cases/conformance/jsx/tsxDefaultAttributesResolution1.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    x: boolean;
}
class Poisoned extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// OK
let p = <Poisoned x/>;

//// [file.jsx]
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
// OK
let p = <Poisoned x/>;
export {};
