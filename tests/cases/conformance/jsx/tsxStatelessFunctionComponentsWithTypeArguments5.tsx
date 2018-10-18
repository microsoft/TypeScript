// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

declare function Component<U>(l: U): JSX.Element;
function createComponent<T extends { prop: number }>(arg: T) {
    let a1 = <Component {...arg} />;
    let a2 = <Component {...arg} prop1 />;
}

declare function ComponentSpecific<U>(l: { prop: U }): JSX.Element;
declare function ComponentSpecific1<U>(l: { prop: U, "ignore-prop": number }): JSX.Element;

function Bar<T extends { prop: number }>(arg: T) {
    let a1 = <ComponentSpecific {...arg} ignore-prop="hi" />;  // U is number
    let a2 = <ComponentSpecific1 {...arg} ignore-prop={10} />;  // U is number
    let a3 = <ComponentSpecific {...arg} prop="hello" />;   // U is "hello"
    let a4 = <ComponentSpecific {...arg} prop1="hello" />;   // U is "hello"
}
