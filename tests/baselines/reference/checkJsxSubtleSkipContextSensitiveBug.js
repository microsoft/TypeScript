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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = require("react");
class AsyncLoader extends React.Component {
    render() { return null; }
}
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        return { success: true };
    });
}
const loader = React.createElement(AsyncLoader, { prop1: load, prop2: result => result });
