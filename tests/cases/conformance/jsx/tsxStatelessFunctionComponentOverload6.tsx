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

let obj = {
    children: "hi",
    to: "boo"
}
let obj1 = undefined;

export function MainButton(buttonProps: ButtonProps): JSX.Element;
export function MainButton(linkProps: LinkProps): JSX.Element;
export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
    const linkProps = props as LinkProps;
    if(linkProps.to) {
        return this._buildMainLink(props);
    }

    return this._buildMainButton(props);
}

// OK
const bo = <MainButton to='/some/path'>GO</MainButton>
const b1 = <MainButton onClick={(e: any)=> {}}>Hello world</MainButton>
const b2 = <MainButton {...obj} />
const b3 = <MainButton {...{to: 10000}} {...obj} />
const b4 = <MainButton {...obj1} />  // any; just pick the first overload
const b5 = <MainButton {...obj1} to="/to/somewhere" />  // should pick the second overload