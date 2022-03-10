// @jsx: react
// @jsxFactory: createElement
// @jsxFragmentFactory: Fragment
// @noUnusedLocals: true
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