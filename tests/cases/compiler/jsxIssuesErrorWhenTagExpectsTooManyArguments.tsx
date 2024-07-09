// @jsx: react
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

interface MyProps {
    x: number;
}

function MyComp4(props: MyProps, context: any, bad: any, verybad: any) {
    return <div></div>;
}
function MyComp3(props: MyProps, context: any, bad: any) {
    return <div></div>;
}
function MyComp2(props: MyProps, context: any) {
    return <div></div>
}

const a = <MyComp4 x={2}/>; // using `MyComp` as a component should error - it expects more arguments than react provides
const b = <MyComp3 x={2}/>; // using `MyComp` as a component should error - it expects more arguments than react provides
const c  = <MyComp2 x={2}/>; // Should be OK, `context` is allowed, per react rules

declare function MyTagWithOptionalNonJSXBits(props: MyProps, context: any, nonReactArg?: string): JSX.Element;
const d = <MyTagWithOptionalNonJSXBits x={2} />; // Technically OK, but probably questionable