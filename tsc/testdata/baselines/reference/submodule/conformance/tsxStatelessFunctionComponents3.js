//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponents3.tsx] ////

//// [file.tsx]
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

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Foo = (props) => <div />;
// Should be OK
const foo = <Foo />;
// Should be OK
var MainMenu = (props) => (<div>
    <h3>Main Menu</h3>
</div>);
var App = ({ children }) => (<div>
        <MainMenu />
	</div>);
