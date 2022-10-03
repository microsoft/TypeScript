// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

declare function OverloadComponent<U>(): JSX.Element;
declare function OverloadComponent<U>(attr: {b: U, a: string, "ignore-prop": boolean}): JSX.Element;
declare function OverloadComponent<T, U>(attr: {b: U, a: T}): JSX.Element;

// Error
function Baz<T extends {b: number}, U extends {a: boolean, b:string}>(arg1: T, arg2: U) {
    let a0 = <OverloadComponent a={arg1.b}/>
    let a2 = <OverloadComponent {...arg1} ignore-prop />  // missing a
}