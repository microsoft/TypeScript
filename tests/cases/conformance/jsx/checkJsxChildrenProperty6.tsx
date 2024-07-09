// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: JSX.Element | JSX.Element[];
}

class Button extends React.Component<any, any> {
    render() {
        return (<div>My Button</div>)
    }
}

function AnotherButton(p: any) {
    return <h1>Just Another Button</h1>;
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// Ok
let k1 =
    <Comp a={10} b="hi">
        <Button />
        <AnotherButton />
    </Comp>;

let k2 =
    <Comp a={10} b="hi">
     
    
    
        <Button />
        <AnotherButton />
    </Comp>;

let k3 = <Comp a={10} b="hi"><Button />  
<AnotherButton />
</Comp>;

let k4 = <Comp a={10} b="hi"><Button /></Comp>;