// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

export interface ClickableProps {
    children?: string;
    className?: string;
}

export interface ButtonProps extends ClickableProps {
    onClick: React.MouseEventHandler<any>;
}

export interface LinkProps extends ClickableProps {
    to: string;
}

let obj0 = {
    to: "world"
};

let obj1 = {
    children: "hi",
    to: "boo"
}

let obj2 = {
    onClick: ()=>{}
}

let obj3 = undefined;

export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
    const linkProps = props as LinkProps;
    if(linkProps.to) {
        return this._buildMainLink(props);
    }

    return this._buildMainButton(props);
}

// Error
const b0 = <MainButton to='/some/path' onClick={(e: any)=>{}}>GO</MainButton>;  // extra property;
const b1 = <MainButton onClick={(e: any)=> {}} {...obj0}>Hello world</MainButton>;  // extra property;
const b2 = <MainButton {...{to: 10000}} {...obj2} />;  // extra property;
const b3 = <MainButton {...obj3} to />;  // Incorrect type;