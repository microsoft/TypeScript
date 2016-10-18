// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface PoisonedProp {
    x: string;
    y: 2;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
}

const obj: PoisonedProp = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;