//// [tests/cases/compiler/reactTransitiveImportHasValidDeclaration.ts] ////

//// [index.d.ts]
declare namespace React {
    export interface DetailedHTMLProps<T, U> {}
    export interface HTMLAttributes<T> {}
}
export = React;
export as namespace React;
//// [index.d.ts]
/// <reference types="react" />
declare module 'react' { // augment
    interface HTMLAttributes<T> {
        css?: unknown;
    }
}
export interface StyledOtherComponentList {
    "div": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
export interface StyledOtherComponent<A, B, C> {}

//// [index.d.ts]
export * from "./types/react";

//// [index.d.ts]
import {StyledOtherComponent, StyledOtherComponentList} from "create-emotion-styled";
export default function styled(tag: string): (o: object) => StyledOtherComponent<{}, StyledOtherComponentList["div"], any>;

//// [index.ts]
import styled from "react-emotion"

const Form = styled('div')({ color: "red" })

export default Form


//// [index.js]
"use strict";
exports.__esModule = true;
var react_emotion_1 = require("react-emotion");
var Form = (0, react_emotion_1["default"])('div')({ color: "red" });
exports["default"] = Form;


//// [index.d.ts]
/// <reference types="react" />
declare const Form: import("create-emotion-styled").StyledOtherComponent<{}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any>;
export default Form;
