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
// OK
var x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1}/>;
var x1 = <OverWriteAttr {...obj1} {...obj3}/>;
