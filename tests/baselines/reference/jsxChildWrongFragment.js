//// [tests/cases/compiler/jsxChildWrongFragment.tsx] ////

//// [index.tsx]
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const test = () => "asd";

// these two should error in the same way 
const jsxWithJsxFragment = <>{test}</>;
const jsxWithReactFragment = <React.Fragment>{test}</React.Fragment>;

const jsxNestedFragment = <><>{test}</></>;


//// [index.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
const test = () => "asd";
// these two should error in the same way 
const jsxWithJsxFragment = React.createElement(React.Fragment, null, test);
const jsxWithReactFragment = React.createElement(React.Fragment, null, test);
const jsxNestedFragment = React.createElement(React.Fragment, null,
    React.createElement(React.Fragment, null, test));
