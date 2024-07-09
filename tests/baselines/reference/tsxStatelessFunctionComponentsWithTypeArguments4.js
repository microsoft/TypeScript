//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponentsWithTypeArguments4.tsx] ////

//// [file.tsx]
import React = require('react')

declare function OverloadComponent<U>(): JSX.Element;
declare function OverloadComponent<U>(attr: {b: U, a: string, "ignore-prop": boolean}): JSX.Element;
declare function OverloadComponent<T, U>(attr: {b: U, a: T}): JSX.Element;

// Error
function Baz<T extends {b: number}, U extends {a: boolean, b:string}>(arg1: T, arg2: U) {
    let a0 = <OverloadComponent a={arg1.b}/>
    let a2 = <OverloadComponent {...arg1} ignore-prop />  // missing a
}

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Error
    function Baz(arg1, arg2) {
        var a0 = <OverloadComponent a={arg1.b}/>;
        var a2 = <OverloadComponent {...arg1} ignore-prop/>; // missing a
    }
});
