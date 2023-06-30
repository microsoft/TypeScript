//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution2.tsx] ////

//// [file.tsx]
import React = require('react');

interface PoisonedProp {
    x: string;
    y: "2";
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {};

// OK
<Poisoned {...{x: "ok", y: "2"}} />;

// Error
let p = <Poisoned {...obj} />;
let y = <Poisoned />;
let z = <Poisoned x y/>;
let w = <Poisoned {...{x: 5, y: "2"}}/>;
let w1 = <Poisoned {...{x: 5, y: "2"}} X="hi" />;

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
var Poisoned = /** @class */ (function (_super) {
    __extends(Poisoned, _super);
    function Poisoned() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Poisoned.prototype.render = function () {
        return <div>Hello</div>;
    };
    return Poisoned;
}(React.Component));
var obj = {};
// OK
<Poisoned {...{ x: "ok", y: "2" }}/>;
// Error
var p = <Poisoned {...obj}/>;
var y = <Poisoned />;
var z = <Poisoned x y/>;
var w = <Poisoned {...{ x: 5, y: "2" }}/>;
var w1 = <Poisoned {...{ x: 5, y: "2" }} X="hi"/>;
