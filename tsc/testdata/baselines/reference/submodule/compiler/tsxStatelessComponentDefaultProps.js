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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const react_1 = __importDefault(require("react"));
function BackButton(_props) {
    return <div />;
}
BackButton.defaultProps = {
    text: 'Go Back',
};
let a = <BackButton />;
