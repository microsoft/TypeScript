//// [reactHOCSpreadprops.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React = require("react");
function f<P>(App: React.ComponentClass<P> | React.StatelessComponent<P>): void {
    class C extends React.Component<P & { x: number }> {
        render() {
            return <App {...this.props} />;
        }
    }
}


//// [reactHOCSpreadprops.js]
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
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var React = require("react");
function f(App) {
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        C.prototype.render = function () {
            return React.createElement(App, __assign({}, this.props));
        };
        return C;
    }(React.Component));
}
