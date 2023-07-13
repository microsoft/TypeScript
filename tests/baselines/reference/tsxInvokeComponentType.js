//// [tests/cases/compiler/tsxInvokeComponentType.tsx] ////

//// [tsxInvokeComponentType.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React, { ComponentType } from "react";

declare const Elem: ComponentType<{ someKey: string }>;

const bad = <Elem />;

const good = <Elem someKey="ok" />;

declare const Elem2: ComponentType<{ opt?: number }>;
const alsoOk = <Elem2>text</Elem2>;


//// [tsxInvokeComponentType.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
var bad = react_1.default.createElement(Elem, null);
var good = react_1.default.createElement(Elem, { someKey: "ok" });
var alsoOk = react_1.default.createElement(Elem2, null, "text");
