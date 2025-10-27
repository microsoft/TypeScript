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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = __importStar(require("react"));
class AsyncLoader extends React.Component {
    render() { return null; }
}
async function load() {
    return { success: true };
}
const loader = React.createElement(AsyncLoader, { prop1: load, prop2: result => result });
