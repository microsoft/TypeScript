//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponentOverload6.tsx] ////

//// [file.tsx]
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




//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainButton = MainButton;
    var obj = {
        children: "hi",
        to: "boo"
    };
    var obj1;
    var obj2 = {
        onClick: function () { }
    };
    function MainButton(props) {
        var linkProps = props;
        if (linkProps.to) {
            return this._buildMainLink(props);
        }
        return this._buildMainButton(props);
    }
    // OK
    var b0 = <MainButton to='/some/path'>GO</MainButton>;
    var b1 = <MainButton onClick={function (e) { }}>Hello world</MainButton>;
    var b2 = <MainButton {...obj}/>;
    var b3 = <MainButton {...{ to: 10000 }} {...obj}/>;
    var b4 = <MainButton {...obj1}/>; // any; just pick the first overload
    var b5 = <MainButton {...obj1} to="/to/somewhere"/>; // should pick the second overload
    var b6 = <MainButton {...obj2}/>;
    var b7 = <MainButton {...{ onClick: function () { console.log("hi"); } }}/>;
    var b8 = <MainButton {...{ onClick: function () { } }}/>; // OK; method declaration get retained (See GitHub #13365)
    var b9 = <MainButton to='/some/path' extra-prop>GO</MainButton>;
    var b10 = <MainButton to='/some/path' children="hi"></MainButton>;
    var b11 = <MainButton onClick={function (e) { }} className="hello" data-format>Hello world</MainButton>;
    var b12 = <MainButton data-format="Hello world"/>;
});
