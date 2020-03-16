// @jsx: react
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react';

declare const Radio: (props: {}) => React.ReactElement<{}>;
declare const OtherRadio: () => React.ReactElement<{}>;
declare const Checkbox: React.SFC;

declare const condition1: boolean;
declare const condition2: boolean;
declare const condition3: boolean;

const RandomComponent: React.SFC = () => {
  const Component =
    condition1
      ? Radio
      : Checkbox;

  const OtherComponent =
    condition2
      ? OtherRadio
      : Checkbox;
  return condition1 ? <Component /> : <OtherComponent />;
};
