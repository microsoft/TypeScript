// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: string | JSX.Element
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// OK
let k = <Comp a={10} b="hi" children ="lol" />;
let k1 =
    <Comp a={10} b="hi">
        hi hi hi!
    </Comp>;
let k2 =
    <Comp a={10} b="hi">
        <div>hi hi hi!</div>
    </Comp>;