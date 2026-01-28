// @filename: file.tsx
// @jsx: preserve
// @module: commonjs
// @strictNullChecks: true
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

const Foo = (props: any) => undefined;
function Greet(x: {name?: string}) {
	return undefined;
}

// Error
const foo = <Foo />;
const G = <Greet />;