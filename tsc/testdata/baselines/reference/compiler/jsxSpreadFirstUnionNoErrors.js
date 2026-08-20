//// [tests/cases/compiler/jsxSpreadFirstUnionNoErrors.tsx] ////

//// [jsxSpreadFirstUnionNoErrors.tsx]
/// <reference path="/.lib/react.d.ts" />
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
/// <reference path="/.lib/react.d.ts" />
import React from "react";
const Info = (props) => props.status === "hidden"
    ? React.createElement("noscript", null)
    : React.createElement("div", null, props.content);
const a = React.createElement(Info, { status: "hidden" });
const b = React.createElement(Info, { status: "visible", content: "hello world" });
const c = React.createElement(Info, Object.assign({}, infoProps));
