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
    onClick: React.MouseEventHandler<any>;
}

export interface LinkProps extends ClickableProps {
    to: string;
}

export interface HyphenProps extends ClickableProps {
    "data-format": string;
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

let obj3: any;

export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(hyphenProps: HyphenProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps | HyphenProps): JSX.Element {
    const linkProps = props as LinkProps;
    if(linkProps.to) {
        return this._buildMainLink(props);
    }

    return this._buildMainButton(props);
}

// Error
const b0 = <MainButton to='/some/path' onClick={(e)=>{}}>GO</MainButton>;  // extra property;
const b1 = <MainButton onClick={(e: any)=> {}} {...obj0}>Hello world</MainButton>;  // extra property;
const b2 = <MainButton {...{to: "10000"}} {...obj2} />;  // extra property
const b3 = <MainButton {...{to: "10000"}} {...{onClick: (k) => {}}} />;  // extra property
const b4 = <MainButton {...obj3} to />;  // Should error because Incorrect type; but attributes are any so everything is allowed
const b5 = <MainButton {...{ onClick(e: any) { } }} {...obj0} />;  // Spread retain method declaration (see GitHub #13365), so now there is an extra attributes
const b6 = <MainButton {...{ onClick(e: any){} }} children={10} />;  // incorrect type for optional attribute
const b7 = <MainButton {...{ onClick(e: any){} }} children="hello" className />;  // incorrect type for optional attribute
const b8 = <MainButton data-format />;  // incorrect type for specified hyphanated name