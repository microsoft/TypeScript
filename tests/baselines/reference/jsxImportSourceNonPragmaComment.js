//// [tests/cases/compiler/jsxImportSourceNonPragmaComment.tsx] ////

//// [jsxImportSourceNonPragmaComment.tsx]
/* eslint-disable react/react-in-jsx-scope -- Unaware of @jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Component() {
  return (
    <input
      css={css`
        color: red;
      `}
    />
  );
}

//// [jsxImportSourceNonPragmaComment.jsx]
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
/* eslint-disable react/react-in-jsx-scope -- Unaware of @jsxImportSource */
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
function Component() {
    return (<input css={(0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        color: red;\n      "], ["\n        color: red;\n      "])))}/>);
}
var templateObject_1;
