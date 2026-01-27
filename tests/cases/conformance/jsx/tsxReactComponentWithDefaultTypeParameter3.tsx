// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P extends Prop> extends React.Component<P, {}> {
    internalProp: P;
}

// Error
let x1 = <MyComp />

// OK
let x = <MyComp a={10} b="hi" />

// Error
let x2 = <MyComp a="hi"/>