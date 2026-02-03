//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponentsWithTypeArguments1.tsx] ////

//// [file.tsx]
import React = require('react')

declare function ComponentWithTwoAttributes<K,V>(l: {key1: K, value: V}): JSX.Element;

// OK
function Baz<T,U>(key1: T, value: U) {
    let a0 = <ComponentWithTwoAttributes key1={key1} value={value} />
    let a1 = <ComponentWithTwoAttributes {...{key1, value: value}} key="Component" />
}

declare function Link<U>(l: {func: (arg: U)=>void}): JSX.Element;

// OK
function createLink(func: (a: number)=>void) {
    let o = <Link func={func} />
}

function createLink1(func: (a: number)=>boolean) {
    let o = <Link func={func} />
}

interface InferParamProp<T> {
    values: Array<T>;
    selectHandler: (selectedVal: T) => void;
}

declare function InferParamComponent<T>(attr: InferParamProp<T>): JSX.Element;

// OK
let i = <InferParamComponent values={[1, 2, 3, 4]} selectHandler={(val) => { }} />;

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // OK
    function Baz(key1, value) {
        var a0 = <ComponentWithTwoAttributes key1={key1} value={value}/>;
        var a1 = <ComponentWithTwoAttributes {...{ key1: key1, value: value }} key="Component"/>;
    }
    // OK
    function createLink(func) {
        var o = <Link func={func}/>;
    }
    function createLink1(func) {
        var o = <Link func={func}/>;
    }
    // OK
    var i = <InferParamComponent values={[1, 2, 3, 4]} selectHandler={function (val) { }}/>;
});
