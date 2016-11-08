//// [file.tsx]

import React = require('react');

const obj = {};
const obj1 = {
    x: 2
}
const obj3 = {
    y: true,
    overwrite: "hi"
}

interface Prop {
    x: number
    y: boolean
    overwrite: string
}

class OverWriteAttr extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// OK
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1} />
let x1 = <OverWriteAttr {...obj1} {...obj3}  />

//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var obj = {};
var obj1 = {
    x: 2
};
var obj3 = {
    y: true,
    overwrite: "hi"
};
var OverWriteAttr = (function (_super) {
    __extends(OverWriteAttr, _super);
    function OverWriteAttr() {
        return _super.apply(this, arguments) || this;
    }
    OverWriteAttr.prototype.render = function () {
        return <div>Hello</div>;
    };
    return OverWriteAttr;
}(React.Component));
// OK
var x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1}/>;
var x1 = <OverWriteAttr {...obj1} {...obj3}/>;
