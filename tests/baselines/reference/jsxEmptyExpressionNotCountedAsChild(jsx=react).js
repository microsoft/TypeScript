//// [tests/cases/compiler/jsxEmptyExpressionNotCountedAsChild.tsx] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
function Wrapper(props) {
    return React.createElement("div", null, props.children);
}
const element = (React.createElement(Wrapper, null,
    React.createElement("div", null, "Hello")));
