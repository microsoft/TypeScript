// @target: es2015
// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

const Foo = (props: any) => <div/>;
// Should be OK
const foo = <Foo />;


// Should be OK
var MainMenu: React.StatelessComponent<{}> = (props) => (<div>
    <h3>Main Menu</h3>
</div>);

var App: React.StatelessComponent<{ children }> = ({children}) => (
    <div >
        <MainMenu/>
	</div>
);