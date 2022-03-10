//// [file.tsx]
import React = require('react');

const obj = {};
const obj1: { x: 2 } = {
    x: 2
}
const obj3: {y: true, overwrite: string } = {
    y: true,
    overwrite: "hi"
}

interface Prop {
    x: 2
    y: true
    overwrite: string
}

class OverWriteAttr extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

let anyobj: any;
// OK
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1} />
let x1 = <OverWriteAttr {...obj1} {...obj3} />
let x2 = <OverWriteAttr x={3} overwrite="hi" {...obj1} {...{y: true}} />
let x3 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{y: true, x: 2, overwrite:"world"}} />
let x4 = <OverWriteAttr {...{x: 2}} {...{overwrite: "world"}} {...{y: true}} />
let x5 = <OverWriteAttr {...anyobj} />

//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var obj = {};
var obj1 = {
    x: 2
};
var obj3 = {
    y: true,
    overwrite: "hi"
};
var OverWriteAttr = /** @class */ (function (_super) {
    __extends(OverWriteAttr, _super);
    function OverWriteAttr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverWriteAttr.prototype.render = function () {
        return <div>Hello</div>;
    };
    return OverWriteAttr;
}(React.Component));
var anyobj;
// OK
var x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1}/>;
var x1 = <OverWriteAttr {...obj1} {...obj3}/>;
var x2 = <OverWriteAttr x={3} overwrite="hi" {...obj1} {...{ y: true }}/>;
var x3 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{ y: true, x: 2, overwrite: "world" }}/>;
var x4 = <OverWriteAttr {...{ x: 2 }} {...{ overwrite: "world" }} {...{ y: true }}/>;
var x5 = <OverWriteAttr {...anyobj}/>;
