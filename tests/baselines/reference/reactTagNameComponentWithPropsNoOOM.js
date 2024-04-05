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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = "";
var rest = {};
var children = [];
React.createElement(Tag, __assign({ className: classes }, rest), children);
