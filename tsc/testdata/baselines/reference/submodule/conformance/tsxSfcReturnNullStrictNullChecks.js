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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Foo = (props) => null;
function Greet(x) {
    return null;
}
const foo = <Foo />;
const G = <Greet />;
