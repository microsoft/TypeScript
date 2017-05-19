//// [file.tsx]
import React = require('react');

interface OptionProp {
    x?: 2
}

class Opt extends React.Component<OptionProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: OptionProp = {};
const obj1: OptionProp = {
    x: 2
}

// Error
let y = <Opt {...obj} x={3}/>;
let y1 = <Opt {...obj1} x="Hi"/>;
let y2 = <Opt {...obj1} x={3}/>;
let y3 = <Opt x />;


//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var Opt = (function (_super) {
    __extends(Opt, _super);
    function Opt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Opt.prototype.render = function () {
        return <div>Hello</div>;
    };
    return Opt;
}(React.Component));
var obj = {};
var obj1 = {
    x: 2
};
// Error
var y = <Opt {...obj} x={3}/>;
var y1 = <Opt {...obj1} x="Hi"/>;
var y2 = <Opt {...obj1} x={3}/>;
var y3 = <Opt x/>;
