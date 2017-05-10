// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P = Prop> extends React.Component<P, {}> {
    internalProp: P;
}

// Error
let x = <MyComp />
let x1 = <MyComp a="hi"/>