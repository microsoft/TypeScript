//// [tests/cases/conformance/jsx/checkJsxSubtleSkipContextSensitiveBug.tsx] ////

//// [checkJsxSubtleSkipContextSensitiveBug.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface ErrorResult { error: true }

interface AsyncLoaderProps<TResult> {
    readonly prop1: () => Promise<TResult>;

    readonly prop2: (result: Exclude<TResult, ErrorResult>) => any;
}

class AsyncLoader<TResult> extends React.Component<AsyncLoaderProps<TResult>> {
    render() { return null; }
}

async function load(): Promise<{ success: true } | ErrorResult> {
    return { success: true };
}

const loader = <AsyncLoader
    prop1={load}
    prop2={result => result}
/>;


//// [checkJsxSubtleSkipContextSensitiveBug.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
class AsyncLoader extends React.Component {
    render() { return null; }
}
async function load() {
    return { success: true };
}
const loader = <AsyncLoader prop1={load} prop2={result => result}/>;
