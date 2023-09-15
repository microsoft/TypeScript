// @strict: true
// @noEmit: true
// @jsx: preserve

/// <reference path="/.lib/react16.d.ts" />

// repro from #53493

import React = require('react');

export type Props =
  | { renderNumber?: false; children: (arg: string) => void }
  | {
      renderNumber: true;
      children: (arg: number) => void;
    };

export declare function Foo(props: Props): JSX.Element;

export const Test = () => {
  return (
    <>
      <Foo>{(value) => {}}</Foo>
      <Foo renderNumber>{(value) => {}}</Foo>

      <Foo children={(value) => {}} />
      <Foo renderNumber children={(value) => {}} />
    </>
  );
};