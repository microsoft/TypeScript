//// [tests/cases/conformance/jsx/checkJsxChildrenCanBeTupleType.tsx] ////

//// [checkJsxChildrenCanBeTupleType.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react'

interface ResizablePanelProps {
  children: [React.ReactNode, React.ReactNode]
}

class ResizablePanel extends React.Component<
  ResizablePanelProps, any> {}

const test = <ResizablePanel>
  <div />
  <div />
</ResizablePanel>

const testErr = <ResizablePanel>
  <div />
  <div />
  <div />
</ResizablePanel>

//// [checkJsxChildrenCanBeTupleType.js]
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ResizablePanel = /** @class */ (function (_super) {
    __extends(ResizablePanel, _super);
    function ResizablePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResizablePanel;
}(react_1.default.Component));
var test = react_1.default.createElement(ResizablePanel, null,
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null));
var testErr = react_1.default.createElement(ResizablePanel, null,
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null));
