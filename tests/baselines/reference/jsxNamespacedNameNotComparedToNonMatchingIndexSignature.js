//// [tests/cases/compiler/jsxNamespacedNameNotComparedToNonMatchingIndexSignature.tsx] ////

//// [jsxNamespacedNameNotComparedToNonMatchingIndexSignature.tsx]
/// <reference path="/.lib/react16.d.ts" />

declare module "react" {
    interface Attributes {
        [key: `do-${string}`]: Function;
        "ns:thing"?: string;
    }
}

export const tag = <div ns:thing="a"/>

//// [jsxNamespacedNameNotComparedToNonMatchingIndexSignature.js]
import { jsx as _jsx } from "react/jsx-runtime";
/// <reference path="react16.d.ts" />
export const tag = _jsx("div", { "ns:thing": "a" });
