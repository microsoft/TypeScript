//// [tests/cases/compiler/jsxIssuesErrorWhenTagExpectsTooManyArguments.tsx] ////

//// [jsxIssuesErrorWhenTagExpectsTooManyArguments.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

interface MyProps {
    x: number;
}

function MyComp4(props: MyProps, context: any, bad: any, verybad: any) {
    return <div></div>;
}
function MyComp3(props: MyProps, context: any, bad: any) {
    return <div></div>;
}
function MyComp2(props: MyProps, context: any) {
    return <div></div>
}

const a = <MyComp4 x={2}/>; // using `MyComp` as a component should error - it expects more arguments than react provides
const b = <MyComp3 x={2}/>; // using `MyComp` as a component should error - it expects more arguments than react provides
const c  = <MyComp2 x={2}/>; // Should be OK, `context` is allowed, per react rules

declare function MyTagWithOptionalNonJSXBits(props: MyProps, context: any, nonReactArg?: string): JSX.Element;
const d = <MyTagWithOptionalNonJSXBits x={2} />; // Technically OK, but probably questionable

//// [jsxIssuesErrorWhenTagExpectsTooManyArguments.js]
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
const React = __importStar(require("react"));
function MyComp4(props, context, bad, verybad) {
    return React.createElement("div", null);
}
function MyComp3(props, context, bad) {
    return React.createElement("div", null);
}
function MyComp2(props, context) {
    return React.createElement("div", null);
}
const a = React.createElement(MyComp4, { x: 2 }); // using `MyComp` as a component should error - it expects more arguments than react provides
const b = React.createElement(MyComp3, { x: 2 }); // using `MyComp` as a component should error - it expects more arguments than react provides
const c = React.createElement(MyComp2, { x: 2 }); // Should be OK, `context` is allowed, per react rules
const d = React.createElement(MyTagWithOptionalNonJSXBits, { x: 2 }); // Technically OK, but probably questionable
