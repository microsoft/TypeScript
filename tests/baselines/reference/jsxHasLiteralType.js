//// [tests/cases/compiler/jsxHasLiteralType.tsx] ////

//// [jsxHasLiteralType.tsx]
/// <reference path="/.lib/react.d.ts" />
import * as React from "react";

interface Props {
    x?: "a" | "b";
}
class MyComponent<P extends Props = Props> extends React.Component<P, {}> {}
const m = <MyComponent x="a"/>


//// [jsxHasLiteralType.js]
/// <reference path="/.lib/react.d.ts" />
import * as React from "react";
class MyComponent extends React.Component {
}
const m = React.createElement(MyComponent, { x: "a" });
