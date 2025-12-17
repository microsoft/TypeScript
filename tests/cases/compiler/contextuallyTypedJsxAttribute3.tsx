// @strict: true
// @jsx: react
// @esModuleInterop: true
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

import React from "react";

// https://github.com/microsoft/TypeScript/issues/61095

type Props =
  | {
      parentId: string[];
      onChange: (event: { id: string }) => void;
      onChange2: () => void;
    }
  | {
      parentId?: never;
      onChange: (event: { id: number }) => void;
    };

function NonGenericComponent(props: Props) {
  return null;
}

<NonGenericComponent onChange={(e) => {}} />;

const parentId: string[] = [];

<NonGenericComponent
  parentId={parentId}
  onChange={(e) => {}}
  onChange2={() => {}}
/>;

<NonGenericComponent
  parentId={[]}
  onChange={(e) => {}}
  onChange2={() => {}}
/>;
