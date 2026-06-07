// @target: es2015
// @jsx: react
// @strict: true
// @filename: index.tsx
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface Props {
    children: string[];
}

export function Comp(props: Props) {
    return <></>;
}

declare const badValue: { notAString: true };

// Error should be on {badValue}, not on {/*  */}
var a = <Comp>
    {/*  */}
    {badValue}
    <br />
</Comp>

// No comment before — error should also be on {badValue}
var b = <Comp>
    {badValue}
    <br />
</Comp>

// Comment after — should not affect error location
var c = <Comp>
    {badValue}
    {/*  */}
</Comp>
