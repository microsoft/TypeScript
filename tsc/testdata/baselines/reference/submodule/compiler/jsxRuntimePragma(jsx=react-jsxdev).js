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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfClosing = exports.frag = exports.HelloWorld = void 0;
/// <reference path="react16.d.ts" />
/* @jsxRuntime classic */
const React = require("react");
const HelloWorld = () => React.createElement("h1", null, "Hello world");
exports.HelloWorld = HelloWorld;
exports.frag = React.createElement(React.Fragment, null,
    React.createElement("div", null));
exports.selfClosing = React.createElement("img", { src: "./image.png" });
//// [two.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfClosing = exports.frag = exports.HelloWorld = void 0;
const jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
/// <reference path="react16.d.ts" />
/* @jsxRuntime automatic */
const HelloWorld = () => jsx_dev_runtime_1.jsxDEV("h1", { children: "Hello world" });
exports.HelloWorld = HelloWorld;
exports.frag = jsx_dev_runtime_1.jsxDEV(jsx_dev_runtime_1.Fragment, { children: jsx_dev_runtime_1.jsxDEV("div", {}) });
exports.selfClosing = jsx_dev_runtime_1.jsxDEV("img", { src: "./image.png" });
//// [three.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfClosing = exports.frag = exports.HelloWorld = void 0;
const jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
/// <reference path="react16.d.ts" />
/* @jsxRuntime classic */
/* @jsxRuntime automatic */
const HelloWorld = () => jsx_dev_runtime_1.jsxDEV("h1", { children: "Hello world" });
exports.HelloWorld = HelloWorld;
exports.frag = jsx_dev_runtime_1.jsxDEV(jsx_dev_runtime_1.Fragment, { children: jsx_dev_runtime_1.jsxDEV("div", {}) });
exports.selfClosing = jsx_dev_runtime_1.jsxDEV("img", { src: "./image.png" });
//// [four.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfClosing = exports.frag = exports.HelloWorld = void 0;
/// <reference path="react16.d.ts" />
/* @jsxRuntime automatic */
/* @jsxRuntime classic */
const React = require("react");
const HelloWorld = () => React.createElement("h1", null, "Hello world");
exports.HelloWorld = HelloWorld;
exports.frag = React.createElement(React.Fragment, null,
    React.createElement("div", null));
exports.selfClosing = React.createElement("img", { src: "./image.png" });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.four = exports.three = exports.two = exports.one = void 0;
exports.one = require("./one.js");
exports.two = require("./two.js");
exports.three = require("./three.js");
exports.four = require("./four.js");
