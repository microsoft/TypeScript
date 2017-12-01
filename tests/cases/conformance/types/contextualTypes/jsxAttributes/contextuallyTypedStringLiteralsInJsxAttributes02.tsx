// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

export interface ClickableProps {
    children?: string;
    className?: string;
}

export interface ButtonProps extends ClickableProps {
    onClick: (k: "left" | "right") => void;
}

export interface LinkProps extends ClickableProps {
    goTo: "home" | "contact";
}

export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
    const linkProps = props as LinkProps;
    if(linkProps.goTo) {
        return this._buildMainLink(props);
    }

    return this._buildMainButton(props);
}

const b0 = <MainButton {...{onClick: (k) => {console.log(k)}}} extra />;  // k has type "left" | "right"
const b2 = <MainButton onClick={(k)=>{console.log(k)}} extra />;  // k has type "left" | "right"
const b3 = <MainButton {...{goTo:"home"}} extra />;  // goTo has type"home" | "contact"
const b4 = <MainButton goTo="home" extra />;  // goTo has type "home" | "contact"

export function NoOverload(buttonProps: ButtonProps): JSX.Element { return undefined }
const c1 = <NoOverload  {...{onClick: (k) => {console.log(k)}}} extra />;  // k has type any

export function NoOverload1(linkProps: LinkProps): JSX.Element { return undefined }
const d1 = <NoOverload1 {...{goTo:"home"}} extra  />;  // goTo has type "home" | "contact"
