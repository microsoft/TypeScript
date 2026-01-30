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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
/* eslint-disable react/react-in-jsx-scope -- Unaware of @jsxImportSource */
/** @jsxImportSource @emotion/react */
const react_1 = require("@emotion/react");
function Component() {
    return (<input css={(0, react_1.css) `
        color: red;
      `}/>);
}
