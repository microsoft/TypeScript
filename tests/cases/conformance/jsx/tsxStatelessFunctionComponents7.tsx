// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @strictNullChecks: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

const Foo = (props: any) => undefined;
function Greet(x: {name?: string}) {
	return undefined;
}
var MainMenu: React.StatelessComponent<{}> = (props) => (undefined
);
var MainMenu2: React.StatelessComponent<{}> = (props) => (null);

// Error
const foo = <Foo />;
const G = <Greet />;
let M = <MainMenu />;
let M2 = <MainMenu2 />;
