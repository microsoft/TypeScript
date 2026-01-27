// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P = Prop> extends React.Component<P, {}> {
    internalProp: P;
}

let x = <MyComp />
let x1 = <MyComp a="hi"/>