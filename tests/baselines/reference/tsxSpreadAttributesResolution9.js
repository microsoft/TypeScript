//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution9.tsx] ////

//// [file.tsx]
import React = require('react');

interface OptionProp {
    x?: 2
    y?: boolean
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

// OK
let p = <Opt />;
let y = <Opt {...obj} />;
let y1 = <Opt {...obj1} />;
let y2 = <Opt {...obj1} y/>;
let y3 = <Opt x={2} />;

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Opt = /** @class */ (function (_super) {
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
// OK
var p = <Opt />;
var y = <Opt {...obj}/>;
var y1 = <Opt {...obj1}/>;
var y2 = <Opt {...obj1} y/>;
var y3 = <Opt x={2}/>;
