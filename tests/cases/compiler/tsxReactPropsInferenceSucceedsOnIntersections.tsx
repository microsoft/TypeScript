// @jsx: react
// @esModuleInterop: true
// @strictNullChecks: true
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
