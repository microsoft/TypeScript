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
var jsx_runtime_1 = require("react/jsx-runtime");
function Wrapper(props) {
    return (0, jsx_runtime_1.jsx)("div", { children: props.children }, void 0);
}
var element = ((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)("div", { children: "Hello" }, void 0) }, void 0));
