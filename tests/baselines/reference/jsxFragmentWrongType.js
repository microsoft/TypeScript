//// [tests/cases/compiler/jsxFragmentWrongType.tsx] ////

//// [a.tsx]
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const test = () => "asd";

const jsxWithJsxFragment = <>{test}</>;
const jsxWithReactFragment = <React.Fragment>{test}</React.Fragment>;


//// [a.js]
"use strict";
/// <reference path="react18/react18.d.ts" />
/// <reference path="react18/global.d.ts" />
const test = () => "asd";
const jsxWithJsxFragment = React.createElement(React.Fragment, null, test);
const jsxWithReactFragment = React.createElement(React.Fragment, null, test);
