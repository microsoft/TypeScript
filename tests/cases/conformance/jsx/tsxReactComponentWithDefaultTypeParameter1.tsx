// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P = Prop> extends React.Component<P, {}> {
    internalProp: P;
}

let x = <MyComp a={10} b="hi" />