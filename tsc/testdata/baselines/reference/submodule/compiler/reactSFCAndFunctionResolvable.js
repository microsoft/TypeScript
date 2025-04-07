//// [tests/cases/compiler/reactSFCAndFunctionResolvable.tsx] ////

//// [reactSFCAndFunctionResolvable.tsx]
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


//// [reactSFCAndFunctionResolvable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
const RandomComponent = () => {
    const Component = condition1
        ? Radio
        : Checkbox;
    const OtherComponent = condition2
        ? OtherRadio
        : Checkbox;
    return condition1 ? <Component /> : <OtherComponent />;
};
