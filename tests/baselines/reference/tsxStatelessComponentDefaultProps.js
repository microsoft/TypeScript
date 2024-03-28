//// [tests/cases/compiler/tsxStatelessComponentDefaultProps.tsx] ////

//// [tsxStatelessComponentDefaultProps.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';
interface Props {
    text: string;
}

function BackButton(_props: Props) {
    return <div />
}
BackButton.defaultProps = {
    text: 'Go Back',
};
let a = <BackButton />


//// [tsxStatelessComponentDefaultProps.js]
"use strict";
/// <reference path="react16.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function BackButton(_props) {
    return react_1.default.createElement("div", null);
}
BackButton.defaultProps = {
    text: 'Go Back',
};
var a = react_1.default.createElement(BackButton, null);
