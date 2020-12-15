//// [tsxNotUsingApparentTypeOfSFC.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

function test<P>(wrappedProps: P) {
    let MySFC = function(props: P) {
        return <>hello</>;
    };
    class MyComponent extends React.Component<P> {
        render() {
            return <>hello</>;
        }
    }
    let x = <MySFC />;  // should error
    let y = <MyComponent />;  // should error

    let z = <MySFC {...wrappedProps} /> // should work
    let q = <MyComponent {...wrappedProps} /> // should work
}

//// [tsxNotUsingApparentTypeOfSFC.js]
"use strict";
/// <reference path="react16.d.ts" />
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
function test(wrappedProps) {
    var MySFC = function (props) {
        return react_1["default"].createElement(react_1["default"].Fragment, null, "hello");
    };
    var MyComponent = /** @class */ (function (_super) {
        __extends(MyComponent, _super);
        function MyComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyComponent.prototype.render = function () {
            return react_1["default"].createElement(react_1["default"].Fragment, null, "hello");
        };
        return MyComponent;
    }(react_1["default"].Component));
    var x = react_1["default"].createElement(MySFC, null); // should error
    var y = react_1["default"].createElement(MyComponent, null); // should error
    var z = react_1["default"].createElement(MySFC, __assign({}, wrappedProps)); // should work
    var q = react_1["default"].createElement(MyComponent, __assign({}, wrappedProps)); // should work
}
