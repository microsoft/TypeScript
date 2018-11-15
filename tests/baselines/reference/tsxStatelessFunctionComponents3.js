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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var Foo = function (props) { return <div />; };
    // Should be OK
    var foo = <Foo />;
    // Should be OK
    var MainMenu = function (props) { return (<div>
    <h3>Main Menu</h3>
    </div>); };
    var App = function (_a) {
        var children = _a.children;
        return (<div>
        <MainMenu />
	</div>);
    };
});
