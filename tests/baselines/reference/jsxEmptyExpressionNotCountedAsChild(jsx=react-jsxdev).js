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
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "tests/cases/compiler/jsxEmptyExpressionNotCountedAsChild.tsx";
function Wrapper(props) {
    return (0, jsx_dev_runtime_1.jsxDEV)("div", { children: props.children }, void 0, false, { fileName: _jsxFileName, lineNumber: 9, columnNumber: 11 }, this);
}
var element = ((0, jsx_dev_runtime_1.jsxDEV)(Wrapper, { children: (0, jsx_dev_runtime_1.jsxDEV)("div", { children: "Hello" }, void 0, false, { fileName: _jsxFileName, lineNumber: 15, columnNumber: 6 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 12, columnNumber: 18 }, this));
