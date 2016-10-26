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
const b4 = <MainButton {...obj3} to />;  // Shoudld erro because Incorrect type; but attributes are any so everything is allowed
const b5 = <MainButton {...{ onclick(){} }} />;  // Spread doesn't retain method declaration
const b6 = <MainButton {...{ onclick(){} }} children={10} />;  // incorrect type for optional attribute
const b7 = <MainButton {...{ onclick(){} }} children="hello" className />;  // incorrect type for optional attribute
const b8 = <MainButton data-format />;  // incorrect type for specified hyphanted name

//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var obj0 = {
        to: "world"
    };
    var obj1 = {
        children: "hi",
        to: "boo"
    };
    var obj2 = {
        onClick: function () { }
    };
    var obj3 = undefined;
    function MainButton(props) {
        var linkProps = props;
        if (linkProps.to) {
            return this._buildMainLink(props);
        }
        return this._buildMainButton(props);
    }
    exports.MainButton = MainButton;
    // Error
    var b0 = <MainButton to='/some/path' onClick={function (e) { }}>GO</MainButton>; // extra property;
    var b1 = <MainButton onClick={function (e) { }} {...obj0}>Hello world</MainButton>; // extra property;
    var b2 = <MainButton {...{ to: "10000" }} {...obj2}/>; // extra property
    var b3 = <MainButton {...{ to: "10000" }} {...{ onClick: function (k) { } }}/>; // extra property
    var b4 = <MainButton {...obj3} to/>; // Shoudld erro because Incorrect type; but attributes are any so everything is allowed
    var b5 = <MainButton {...{ onclick: function () { } }}/>; // Spread doesn't retain method declaration
    var b6 = <MainButton {...{ onclick: function () { } }} children={10}/>; // incorrect type for optional attribute
    var b7 = <MainButton {...{ onclick: function () { } }} children="hello" className/>; // incorrect type for optional attribute
    var b8 = <MainButton data-format/>; // incorrect type for specified hyphanted name
});
