//// [tests/cases/compiler/ignoredJsxAttributes.tsx] ////

//// [ignoredJsxAttributes.tsx]
/// <reference path="/.lib/react16.d.ts" />

// Repro from #44797

import * as React from "react";

interface Props {
    foo: string;
    [dataProp: string]: string;
}

declare function Yadda(props: Props): JSX.Element;

let props: Props = {
    foo: "",
    "data-yadda": 42,  // Error
};

let x1 = <Yadda foo="hello" data-yadda={42}/>;
let x2 = <Yadda bar="hello" data-yadda={42}/>;  // Error


//// [ignoredJsxAttributes.js]
"use strict";
/// <reference path="react16.d.ts" />
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
// Repro from #44797
const React = __importStar(require("react"));
let props = {
    foo: "",
    "data-yadda": 42, // Error
};
let x1 = React.createElement(Yadda, { foo: "hello", "data-yadda": 42 });
let x2 = React.createElement(Yadda, { bar: "hello", "data-yadda": 42 }); // Error
