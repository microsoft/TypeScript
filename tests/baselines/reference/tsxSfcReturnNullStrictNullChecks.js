//// [tests/cases/conformance/jsx/tsxSfcReturnNullStrictNullChecks.tsx] ////

//// [file.tsx]
import React = require('react');

const Foo = (props: any) => null;

function Greet(x: {name?: string}) {
	return null;
}

const foo = <Foo />;
const G = <Greet />;

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Foo = function (props) { return null; };
    function Greet(x) {
        return null;
    }
    var foo = <Foo />;
    var G = <Greet />;
});
