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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class MyComponent extends react_1.default.Component {
    render() {
        return (<div {...this.props} className="ok"></div>);
    }
}
