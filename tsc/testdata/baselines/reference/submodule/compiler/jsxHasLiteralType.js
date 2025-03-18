//// [tests/cases/compiler/jsxHasLiteralType.tsx] ////

//// [jsxHasLiteralType.tsx]
import * as React from "react";

interface Props {
    x?: "a" | "b";
}
class MyComponent<P extends Props = Props> extends React.Component<P, {}> {}
const m = <MyComponent x="a"/>


//// [jsxHasLiteralType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MyComponent extends React.Component {
}
const m = <MyComponent x="a"/>;
