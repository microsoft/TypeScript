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

let obj = {
    children: "hi",
    to: "boo"
}
let obj1: any;
let obj2 = {
    onClick: () => {}
}

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

// OK
const b0 = <MainButton to='/some/path'>GO</MainButton>;
const b1 = <MainButton onClick={(e) => {}}>Hello world</MainButton>;
const b2 = <MainButton {...obj} />;
const b3 = <MainButton {...{to: 10000}} {...obj} />;
const b4 = <MainButton {...obj1} />;  // any; just pick the first overload
const b5 = <MainButton {...obj1} to="/to/somewhere" />;  // should pick the second overload
const b6 = <MainButton {...obj2} />;
const b7 = <MainButton {...{onClick: () => { console.log("hi") }}} />;
const b8 = <MainButton {...{onClick() {}}} />;  // OK; method declaration get retained (See GitHub #13365)
const b9 = <MainButton to='/some/path' extra-prop>GO</MainButton>;
const b10 = <MainButton to='/some/path' children="hi" ></MainButton>;
const b11 = <MainButton onClick={(e) => {}} className="hello" data-format>Hello world</MainButton>;
const b12 = <MainButton data-format="Hello world" />


