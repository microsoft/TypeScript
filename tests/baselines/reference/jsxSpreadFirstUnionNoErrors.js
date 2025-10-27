//// [tests/cases/compiler/jsxSpreadFirstUnionNoErrors.tsx] ////

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Info = (props) => props.status === "hidden"
    ? react_1.default.createElement("noscript", null)
    : react_1.default.createElement("div", null, props.content);
const a = react_1.default.createElement(Info, { status: "hidden" });
const b = react_1.default.createElement(Info, { status: "visible", content: "hello world" });
const c = react_1.default.createElement(Info, Object.assign({}, infoProps));
