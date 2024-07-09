// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts
// @allowJs: true
// @outDir: ./out
// @checkJs: true
// @filename: component.d.ts
import * as React from "react";
export declare class MyComp<P> extends React.Component<P, {}> {
    internalProp: P;
}

export interface Prop {
    a: number,
    b: string
}

// @filename: file.jsx
import { MyComp, Prop } from "./component";
import * as React from "react";

let x = <MyComp<Prop> a={10} b="hi" />; // error, no type arguments in js
