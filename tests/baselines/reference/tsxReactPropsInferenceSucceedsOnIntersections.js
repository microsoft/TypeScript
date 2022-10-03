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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var CustomButton = function (props) { return react_1["default"].createElement(Button, __assign({}, props)); };
