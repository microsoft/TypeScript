//// [tests/cases/compiler/reactReadonlyHOCAssignabilityReal.tsx] ////

//// [reactReadonlyHOCAssignabilityReal.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

function myHigherOrderComponent<P>(Inner: React.ComponentClass<P & {name: string}>): React.ComponentClass<P> {
    return class OuterComponent extends React.Component<P> {
        render() {
            return <Inner {...this.props} name="Matt"/>;
        }
    };
}

//// [reactReadonlyHOCAssignabilityReal.js]
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = require("react");
function myHigherOrderComponent(Inner) {
    return /** @class */ (function (_super) {
        __extends(OuterComponent, _super);
        function OuterComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OuterComponent.prototype.render = function () {
            return React.createElement(Inner, __assign({}, this.props, { name: "Matt" }));
        };
        return OuterComponent;
    }(React.Component));
}
