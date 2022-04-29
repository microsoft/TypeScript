// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface OptionProp {
    x?: 2
}

class Opt extends React.Component<OptionProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: OptionProp = {};
const obj1: OptionProp = {
    x: 2
}

// Error
let y = <Opt {...obj} x={3}/>;
let y1 = <Opt {...obj1} x="Hi"/>;
let y2 = <Opt {...obj1} x={3}/>;
let y3 = <Opt x />;
