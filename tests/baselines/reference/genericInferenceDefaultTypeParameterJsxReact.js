//// [tests/cases/compiler/genericInferenceDefaultTypeParameterJsxReact.tsx] ////

//// [genericInferenceDefaultTypeParameterJsxReact.tsx]
/// <reference path="/.lib/react16.d.ts" />

// Repro from #50858

import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type ButtonBaseProps<T extends ElementType> = ComponentPropsWithRef<T> & { children?: ReactNode };

function Component<T extends ElementType = 'span'>(props: ButtonBaseProps<T>) {
    return <></>;
}

const v1 = <Component onClick={e => e.preventDefault()} />;


//// [genericInferenceDefaultTypeParameterJsxReact.js]
"use strict";
/// <reference path="react16.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Repro from #50858
var react_1 = __importDefault(require("react"));
function Component(props) {
    return react_1.default.createElement(react_1.default.Fragment, null);
}
var v1 = react_1.default.createElement(Component, { onClick: function (e) { return e.preventDefault(); } });
