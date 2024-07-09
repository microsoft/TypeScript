// @jsx: react
// @strict: true
// @esModuleInterop: true
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