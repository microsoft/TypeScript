//// [tests/cases/compiler/jsxChildWrongFragment.tsx] ////

//// [index.tsx]
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const test = () => "asd";

// No Errors
const jsxWithJsxFragment = <>{test}</>;

// Type '() => string' is not assignable to type 'ReactNode'.
const jsxWithReactFragment = <React.Fragment>{test}</React.Fragment>;


//// [index.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
const test = () => "asd";
// No Errors
const jsxWithJsxFragment = React.createElement(React.Fragment, null, test);
// Type '() => string' is not assignable to type 'ReactNode'.
const jsxWithReactFragment = React.createElement(React.Fragment, null, test);
