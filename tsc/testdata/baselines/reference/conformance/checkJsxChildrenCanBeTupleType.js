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
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';
class ResizablePanel extends React.Component {
}
const test = React.createElement(ResizablePanel, null,
    React.createElement("div", null),
    React.createElement("div", null));
const testErr = React.createElement(ResizablePanel, null,
    React.createElement("div", null),
    React.createElement("div", null),
    React.createElement("div", null));
