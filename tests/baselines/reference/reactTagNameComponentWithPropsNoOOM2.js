//// [tests/cases/compiler/reactTagNameComponentWithPropsNoOOM2.tsx] ////

//// [reactTagNameComponentWithPropsNoOOM2.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";
declare const Tag: keyof React.ReactHTML;

const classes = "";
const rest: React.HTMLAttributes<HTMLElement> = {};
const children: any[] = [];
<Tag className={classes} {...rest}>
{children}
</Tag>

//// [reactTagNameComponentWithPropsNoOOM2.js]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classes = "";
const rest = {};
const children = [];
React.createElement(Tag, Object.assign({ className: classes }, rest), children);
