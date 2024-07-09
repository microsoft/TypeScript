// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: Button;
}

class Button extends React.Component<any, any> {
    render() {
        return (<div>My Button</div>)
    }
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// Error: no children specified
let k = <Comp a={10} b="hi" />;

// Error: JSX.element is not the same as JSX.ElementClass
let k1 =
    <Comp a={10} b="hi">
        <Button />
    </Comp>;
let k2 =
    <Comp a={10} b="hi">
        {Button}
    </Comp>;