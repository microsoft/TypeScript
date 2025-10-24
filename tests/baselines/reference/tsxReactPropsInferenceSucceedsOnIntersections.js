//// [tests/cases/compiler/tsxReactPropsInferenceSucceedsOnIntersections.tsx] ////

//// [tsxReactPropsInferenceSucceedsOnIntersections.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

export type ButtonProps<T = {}> = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean;
} & T;

declare class Button<T = {}> extends React.Component<ButtonProps<T>> { }

interface CustomButtonProps extends ButtonProps {
    customProp: string;
}

const CustomButton: React.SFC<CustomButtonProps> = props => <Button {...props} />;


//// [tsxReactPropsInferenceSucceedsOnIntersections.js]
"use strict";
/// <reference path="react16.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CustomButton = props => react_1.default.createElement(Button, Object.assign({}, props));
