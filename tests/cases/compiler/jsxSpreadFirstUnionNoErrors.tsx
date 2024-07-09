// @jsx: react
// @libFiles: lib.d.ts,react.d.ts
// @skipLibCheck: true
// @allowSyntheticDefaultImports: true
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