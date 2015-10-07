//// [tests/cases/conformance/jsx/tsxPreserveEmit1.tsx] ////

//// [react.d.ts]

declare module 'react' {
	var x: any;
	export = x;
}

declare module ReactRouter {
	var Route: any;
	interface Thing { }
}
declare module 'react-router' {
	export = ReactRouter;
}

//// [test.tsx]
// Should emit 'react-router' in the AMD dependency list
import React = require('react');
import ReactRouter = require('react-router');

import Route = ReactRouter.Route;

var routes = <Route />;


//// [test.jsx]
define(["require", "exports", 'react-router'], function (require, exports, ReactRouter) {
    var Route = ReactRouter.Route;
    var routes = <Route />;
});
