//// [jsxEmptyExpressionNotCountedAsChild.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from 'react'

interface Props {
    children: React.ReactElement<any>
}

function Wrapper(props: Props) {
    return <div>{props.children}</div>
}

const element = (
    <Wrapper>
    {/* comment */}
     <div>Hello</div>
    </Wrapper>
)

//// [jsxEmptyExpressionNotCountedAsChild.js]
"use strict";
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var React = require("react");
function Wrapper(props) {
    return React.createElement("div", null, props.children);
}
var element = (React.createElement(Wrapper, null,
    React.createElement("div", null, "Hello")));
