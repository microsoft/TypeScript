//// [file.tsx]

import React = require('react')


declare function ComponentWithTwoAttributes<K,V>(l: {key1: K, value: V}): JSX.Element;

// OK
function Baz<T,U>(key1: T, value: U) {
    let a0 = <ComponentWithTwoAttributes key1={key1} value={value} />
    let a1 = <ComponentWithTwoAttributes {...{key1, value: value}} key="Component" />
}

// OK
declare function Component<U>(l: U): JSX.Element;
function createComponent<T extends {prop: number}>(arg:T) {
    let a1 = <Component {...arg} />;
    let a2 = <Component {...arg} prop1 />;
}

declare function ComponentSpecific<U>(l: {prop: U}): JSX.Element;
declare function ComponentSpecific1<U>(l: {prop: U, "ignore-prop": number}): JSX.Element;

// OK
function Bar<T extends {prop: number}>(arg: T) {
    let a1 = <ComponentSpecific {...arg} ignore-prop="hi" />;  // U is number
    let a2 = <ComponentSpecific1 {...arg} ignore-prop={10} />;  // U is number
    let a3 = <ComponentSpecific {...arg} prop="hello" />;   // U is "hello"
}

declare function Link<U>(l: {func: (arg: U)=>void}): JSX.Element;

// OK
function createLink(func: (a: number)=>void) {
    let o = <Link func={func} />
}

function createLink1(func: (a: number)=>boolean) {
    let o = <Link func={func} />
}



//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    // OK
    function Baz(key1, value) {
        var a0 = <ComponentWithTwoAttributes key1={key1} value={value}/>;
        var a1 = <ComponentWithTwoAttributes {...{ key1: key1, value: value }} key="Component"/>;
    }
    function createComponent(arg) {
        var a1 = <Component {...arg}/>;
        var a2 = <Component {...arg} prop1/>;
    }
    // OK
    function Bar(arg) {
        var a1 = <ComponentSpecific {...arg} ignore-prop="hi"/>; // U is number
        var a2 = <ComponentSpecific1 {...arg} ignore-prop={10}/>; // U is number
        var a3 = <ComponentSpecific {...arg} prop="hello"/>; // U is "hello"
    }
    // OK
    function createLink(func) {
        var o = <Link func={func}/>;
    }
    function createLink1(func) {
        var o = <Link func={func}/>;
    }
});
