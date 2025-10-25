//// [tests/cases/compiler/tsxSpreadDoesNotReportExcessProps.tsx] ////

//// [tsxSpreadDoesNotReportExcessProps.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

class MyComponent extends React.Component<{dataSource: number[], onClick?: any}, {}> {
    render() {
        return (<div {...this.props} className="ok"></div>);
    }
}


//// [tsxSpreadDoesNotReportExcessProps.js]
"use strict";
/// <reference path="react16.d.ts" />
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class MyComponent extends react_1.default.Component {
    render() {
        return (react_1.default.createElement("div", __assign({}, this.props, { className: "ok" })));
    }
}
