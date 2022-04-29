//// [file.tsx]
import React = require('react')
declare function OneThing(): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string}): JSX.Element;

let obj = {
    yy: 10,
    yy1: "hello"
}

let obj1 = {
    yy: true
}

let obj2 = {
    yy: 500,
    "ignore-prop": "hello"
}

let defaultObj: any;

// OK
const c1 = <OneThing />
const c2 = <OneThing {...obj}/>
const c3 = <OneThing {...{}} />
const c4 = <OneThing {...obj1} {...obj} />
const c5 = <OneThing {...obj1} yy={42} {...{yy1: "hi"}}/>
const c6 = <OneThing {...obj1} {...{yy: 10000, yy1: "true"}} />
const c7 = <OneThing {...defaultObj} yy {...obj} />;  // No error. should pick second overload
const c8 = <OneThing ignore-prop={100} />
const c9 = <OneThing {...{ "ignore-prop":200 }} />;
const c10 = <OneThing {...obj2} yy1="boo" />;


//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var obj = {
        yy: 10,
        yy1: "hello"
    };
    var obj1 = {
        yy: true
    };
    var obj2 = {
        yy: 500,
        "ignore-prop": "hello"
    };
    var defaultObj;
    // OK
    var c1 = <OneThing />;
    var c2 = <OneThing {...obj}/>;
    var c3 = <OneThing {...{}}/>;
    var c4 = <OneThing {...obj1} {...obj}/>;
    var c5 = <OneThing {...obj1} yy={42} {...{ yy1: "hi" }}/>;
    var c6 = <OneThing {...obj1} {...{ yy: 10000, yy1: "true" }}/>;
    var c7 = <OneThing {...defaultObj} yy {...obj}/>; // No error. should pick second overload
    var c8 = <OneThing ignore-prop={100}/>;
    var c9 = <OneThing {...{ "ignore-prop": 200 }}/>;
    var c10 = <OneThing {...obj2} yy1="boo"/>;
});
