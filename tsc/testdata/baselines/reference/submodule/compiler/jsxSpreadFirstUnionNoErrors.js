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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Info = (props) => props.status === "hidden"
    ? <noscript />
    : <div>{props.content}</div>;
const a = <Info status="hidden"/>;
const b = <Info status="visible" content="hello world"/>;
const c = <Info {...infoProps}/>;
