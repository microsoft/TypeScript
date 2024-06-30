//// [tests/cases/conformance/types/contextualTypes/jsxAttributes/contextuallyTypedStringLiteralsInJsxAttributes02.tsx] ////

//// [file.tsx]
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


//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainButton = MainButton;
    exports.NoOverload = NoOverload;
    exports.NoOverload1 = NoOverload1;
    function MainButton(props) {
        var linkProps = props;
        if (linkProps.goTo) {
            return this._buildMainLink(props);
        }
        return this._buildMainButton(props);
    }
    var b0 = <MainButton {...{ onClick: function (k) { console.log(k); } }} extra/>; // k has type "left" | "right"
    var b2 = <MainButton onClick={function (k) { console.log(k); }} extra/>; // k has type "left" | "right"
    var b3 = <MainButton {...{ goTo: "home" }} extra/>; // goTo has type"home" | "contact"
    var b4 = <MainButton goTo="home" extra/>; // goTo has type "home" | "contact"
    function NoOverload(buttonProps) { return undefined; }
    var c1 = <NoOverload {...{ onClick: function (k) { console.log(k); } }} extra/>; // k has type any
    function NoOverload1(linkProps) { return undefined; }
    var d1 = <NoOverload1 {...{ goTo: "home" }} extra/>; // goTo has type "home" | "contact"
});
