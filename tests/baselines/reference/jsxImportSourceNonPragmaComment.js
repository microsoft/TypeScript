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
/* eslint-disable react/react-in-jsx-scope -- Unaware of @jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export default function Component() {
    return (<input css={css `
        color: red;
      `}/>);
}
