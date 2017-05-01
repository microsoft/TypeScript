// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P extends Prop> extends React.Component<P, {}> {
    internalProp: P;
}

// OK: we fille in missing type argument with empty object
let x1 = <MyComp />

// Error
let x = <MyComp a={10} b="hi" />
let x2 = <MyComp a="hi"/>