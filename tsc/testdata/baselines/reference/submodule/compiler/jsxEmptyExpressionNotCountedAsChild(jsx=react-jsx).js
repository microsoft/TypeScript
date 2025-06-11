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
const jsx_runtime_1 = require("react/jsx-runtime");
function Wrapper(props) {
    return jsx_runtime_1.jsx("div", { children: props.children });
}
const element = (jsx_runtime_1.jsx(Wrapper, { children: jsx_runtime_1.jsx("div", { children: "Hello" }) }));
