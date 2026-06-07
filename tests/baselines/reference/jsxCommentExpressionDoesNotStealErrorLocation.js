//// [tests/cases/compiler/jsxCommentExpressionDoesNotStealErrorLocation.tsx] ////

//// [index.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface Props {
    children: string[];
}

export function Comp(props: Props) {
    return <></>;
}

declare const badValue: { notAString: true };

// Error should be on {badValue}, not on {/*  */}
var a = <Comp>
    {/*  */}
    {badValue}
    <br />
</Comp>

// No comment before — error should also be on {badValue}
var b = <Comp>
    {badValue}
    <br />
</Comp>

// Comment after — should not affect error location
var c = <Comp>
    {badValue}
    {/*  */}
</Comp>


//// [index.js]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
export function Comp(props) {
    return React.createElement(React.Fragment, null);
}
// Error should be on {badValue}, not on {/*  */}
var a = React.createElement(Comp, null,
    badValue,
    React.createElement("br", null));
// No comment before — error should also be on {badValue}
var b = React.createElement(Comp, null,
    badValue,
    React.createElement("br", null));
// Comment after — should not affect error location
var c = React.createElement(Comp, null, badValue);
