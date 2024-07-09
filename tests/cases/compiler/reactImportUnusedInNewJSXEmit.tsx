// @esModuleInterop: true
// @noUnusedLocals: true
// @jsx: react-jsx,react-jsxdev
// @skipLibCheck: true
// @filename: index.tsx
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

function Bar() {
  return <div />;
}

export function Foo() {
  return <Bar />;
}