//// [tests/cases/compiler/reactTagNameComponentWithPropsNoOOM.tsx] ////

//// [reactTagNameComponentWithPropsNoOOM.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";
declare const Tag: keyof React.ReactHTML;

const classes = "";
const rest: {} = {};
const children: any[] = [];
<Tag className={classes} {...rest}>
{children}
</Tag>

//// [reactTagNameComponentWithPropsNoOOM.js]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classes = "";
const rest = {};
const children = [];
React.createElement(Tag, Object.assign({ className: classes }, rest), children);
