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
var react_1 = require("react");
function Counter(_a) {
    var _b = _a.count, count = _b === void 0 ? 0 : _b;
    var _c = null, cnt = _c[0], setCnt = _c[1];
    return (0, react_1.createElement)(react_1.Fragment, null,
        (0, react_1.createElement)("p", null, cnt),
        (0, react_1.createElement)("button", { onClick: function () { return setCnt(function (prev) { return prev + 1; }); }, type: "button" }, "Update"));
}
