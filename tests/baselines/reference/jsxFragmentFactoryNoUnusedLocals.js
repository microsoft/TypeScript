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
/// <reference path="/.lib/react16.d.ts" />
import { Fragment, createElement } from "react";
export function Counter({ count = 0 }) {
    const [cnt, setCnt] = null;
    return createElement(Fragment, null,
        createElement("p", null, cnt),
        createElement("button", { onClick: () => setCnt((prev) => prev + 1), type: "button" }, "Update"));
}
