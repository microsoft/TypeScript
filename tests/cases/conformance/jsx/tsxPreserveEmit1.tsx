//@module: amd
//@jsx: preserve
//@target: ES5

//@Filename: react.d.ts
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

//@Filename: test.tsx
// Should emit 'react-router' in the AMD dependency list
import React = require('react');
import ReactRouter = require('react-router');

import Route = ReactRouter.Route;

var routes1 = <Route />;

module M {
	export var X: any;
}
module M {
	// Should emit 'M.X' in both opening and closing tags
	var y = <X></X>;
}
