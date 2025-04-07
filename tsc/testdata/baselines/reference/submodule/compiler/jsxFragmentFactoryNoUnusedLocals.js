//// [tests/cases/compiler/jsxFragmentFactoryNoUnusedLocals.tsx] ////

//// [jsxFragmentFactoryNoUnusedLocals.tsx]
/// <reference path="/.lib/react16.d.ts" />
import { Fragment, createElement } from "react"

type CounterProps = {
    count?: number
}

export function Counter({ count = 0 }: CounterProps) {
    const [cnt, setCnt] = null as any;
    return <>
        <p>{cnt}</p>
        <button onClick={() => setCnt((prev) => prev + 1)} type="button">Update</button>
    </>
}

//// [jsxFragmentFactoryNoUnusedLocals.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = Counter;
/// <reference path="react16.d.ts" />
const react_1 = require("react");
function Counter({ count = 0 }) {
    const [cnt, setCnt] = null;
    return <>
        <p>{cnt}</p>
        <button onClick={() => setCnt((prev) => prev + 1)} type="button">Update</button>
    </>;
}
