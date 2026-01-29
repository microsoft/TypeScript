//// [tests/cases/compiler/jsxRuntimePragma.ts] ////

//// [one.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
//// [two.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
//// [three.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
/* @jsxRuntime automatic */
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
//// [four.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
//// [index.ts]
export * as one from "./one.js";
export * as two from "./two.js";
export * as three from "./three.js";
export * as four from "./four.js";

//// [one.js]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => React.createElement("h1", null, "Hello world");
export const frag = React.createElement(React.Fragment, null,
    React.createElement("div", null));
export const selfClosing = React.createElement("img", { src: "./image.png" });
//// [two.js]
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const _jsxFileName = "two.tsx";
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
export const HelloWorld = () => _jsxDEV("h1", { children: "Hello world" }, void 0, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 32 }, this);
export const frag = _jsxDEV(_Fragment, { children: _jsxDEV("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 23 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 20 }, this);
export const selfClosing = _jsxDEV("img", { src: "./image.png" }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 27 }, this);
//// [three.js]
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const _jsxFileName = "three.tsx";
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
/* @jsxRuntime automatic */
export const HelloWorld = () => _jsxDEV("h1", { children: "Hello world" }, void 0, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 32 }, this);
export const frag = _jsxDEV(_Fragment, { children: _jsxDEV("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 23 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 20 }, this);
export const selfClosing = _jsxDEV("img", { src: "./image.png" }, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 27 }, this);
//// [four.js]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => React.createElement("h1", null, "Hello world");
export const frag = React.createElement(React.Fragment, null,
    React.createElement("div", null));
export const selfClosing = React.createElement("img", { src: "./image.png" });
//// [index.js]
import * as one_1 from "./one.js";
export { one_1 as one };
import * as two_1 from "./two.js";
export { two_1 as two };
import * as three_1 from "./three.js";
export { three_1 as three };
import * as four_1 from "./four.js";
export { four_1 as four };
