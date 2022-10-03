// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

declare function OverloadComponent<U>(): JSX.Element;
declare function OverloadComponent<U>(attr: {b: U, a?: string, "ignore-prop": boolean}): JSX.Element;
declare function OverloadComponent<T, U>(attr: {b: U, a: T}): JSX.Element;

// OK
function Baz<T extends {b: number}, U extends {a: boolean, b:string}>(arg1: T, arg2: U) {
    let a0 = <OverloadComponent {...arg1} a="hello" ignore-prop />;
    let a1 = <OverloadComponent {...arg2} ignore-pro="hello world" />;
    let a2 = <OverloadComponent {...arg2} />;
    let a3 = <OverloadComponent {...arg1} ignore-prop />;
    let a4 = <OverloadComponent />;
    let a5 = <OverloadComponent {...arg2} ignore-prop="hello" {...arg1} />;
    let a6 = <OverloadComponent {...arg2} ignore-prop {...arg1} />;
}

declare function Link<U>(l: {func: (arg: U)=>void}): JSX.Element;
declare function Link<U>(l: {func: (arg1:U, arg2: string)=>void}): JSX.Element;
function createLink(func: (a: number)=>void) {
    let o = <Link func={func} />
    let o1 = <Link func={(a:number, b:string)=>{}} />;
}