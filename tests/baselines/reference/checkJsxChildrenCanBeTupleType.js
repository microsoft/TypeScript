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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class ResizablePanel extends react_1.default.Component {
}
const test = react_1.default.createElement(ResizablePanel, null,
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null));
const testErr = react_1.default.createElement(ResizablePanel, null,
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null));
