// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface PoisonedProp {
    x: string;
    y: number;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;
let y = <Poisoned x="hi" y={2} />;