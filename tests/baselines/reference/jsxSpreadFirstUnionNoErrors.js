//// [jsxSpreadFirstUnionNoErrors.tsx]
import React from "react";

type InfoProps =
| { status: "hidden" }
| { status: "visible"; content: string };

const Info = (props: InfoProps) =>
props.status === "hidden"
  ? <noscript />
  : <div>{props.content}</div>;

const a = <Info status="hidden" />;
const b = <Info status="visible" content="hello world" />;
declare const infoProps: InfoProps;

const c = <Info {...infoProps} />;

//// [jsxSpreadFirstUnionNoErrors.js]
"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var Info = function (props) {
    return props.status === "hidden"
        ? react_1["default"].createElement("noscript", null)
        : react_1["default"].createElement("div", null, props.content);
};
var a = react_1["default"].createElement(Info, { status: "hidden" });
var b = react_1["default"].createElement(Info, { status: "visible", content: "hello world" });
var c = react_1["default"].createElement(Info, __assign({}, infoProps));
