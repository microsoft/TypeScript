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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
const classes = "";
const rest = {};
const children = [];
<Tag className={classes} {...rest}>
{children}
</Tag>;
