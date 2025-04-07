//// [tests/cases/conformance/jsx/tsxSfcReturnUndefinedStrictNullChecks.tsx] ////

//// [file.tsx]
import React = require('react');

const Foo = (props: any) => undefined;
function Greet(x: {name?: string}) {
	return undefined;
}

// Error
const foo = <Foo />;
const G = <Greet />;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Foo = (props) => undefined;
function Greet(x) {
    return undefined;
}
// Error
const foo = <Foo />;
const G = <Greet />;
