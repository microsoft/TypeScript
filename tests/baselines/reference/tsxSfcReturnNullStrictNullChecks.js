//// [tests/cases/conformance/jsx/tsxSfcReturnNullStrictNullChecks.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

const Foo = (props: any) => null;

function Greet(x: {name?: string}) {
	return null;
}

const foo = <Foo />;
const G = <Greet />;

//// [file.jsx]
/// <reference path="/.lib/react.d.ts" />
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Foo = (props) => null;
    function Greet(x) {
        return null;
    }
    const foo = <Foo />;
    const G = <Greet />;
});
