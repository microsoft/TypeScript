// @declaration: true
// @filename: node_modules/react/index.d.ts
declare namespace React {
    export interface DetailedHTMLProps<T, U> {}
    export interface HTMLAttributes<T> {}
}
export = React;
export as namespace React;
// @filename: node_modules/create-emotion-styled/types/react/index.d.ts
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

// @filename: node_modules/create-emotion-styled/index.d.ts
export * from "./types/react";

// @filename: node_modules/react-emotion/index.d.ts
import {StyledOtherComponent, StyledOtherComponentList} from "create-emotion-styled";
export default function styled(tag: string): (o: object) => StyledOtherComponent<{}, StyledOtherComponentList["div"], any>;

// @filename: index.ts
import styled from "react-emotion"

const Form = styled('div')({ color: "red" })

export default Form
