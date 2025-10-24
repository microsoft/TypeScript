//// [tests/cases/compiler/jsxExcessPropsAndAssignability.tsx] ////

//// [jsxExcessPropsAndAssignability.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react';

const myHoc = <ComposedComponentProps extends any>(
    ComposedComponent: React.ComponentClass<ComposedComponentProps>,
) => {
    type WrapperComponentProps = ComposedComponentProps & { myProp: string };
    const WrapperComponent: React.ComponentClass<WrapperComponentProps> = null as any;

    const props: ComposedComponentProps = null as any;

    <WrapperComponent {...props} myProp={'1000000'} />;
    <WrapperComponent {...props} myProp={1000000} />;
};


//// [jsxExcessPropsAndAssignability.js]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const myHoc = (ComposedComponent) => {
    const WrapperComponent = null;
    const props = null;
    React.createElement(WrapperComponent, Object.assign({}, props, { myProp: '1000000' }));
    React.createElement(WrapperComponent, Object.assign({}, props, { myProp: 1000000 }));
};
