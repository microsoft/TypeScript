//// [jsxExcessPropsAndAssignability.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react';

const myHoc = <ComposedComponentProps extends any>(
    ComposedComponent: React.ComponentClass<ComposedComponentProps>,
) => {
    type WrapperComponentProps = ComposedComponentProps & { myProp: string };
    const WrapperComponent: React.ComponentClass<WrapperComponentProps> = null as any;

    const props: ComposedComponentProps = null as any;

    // Expected no error, got none - good
    <WrapperComponent {...props} myProp={'1000000'} />;
    // Expected error, but got none - bad!
    <WrapperComponent {...props} myProp={1000000} />;
};


//// [jsxExcessPropsAndAssignability.js]
"use strict";
/// <reference path="react16.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var myHoc = function (ComposedComponent) {
    var WrapperComponent = null;
    var props = null;
    // Expected no error, got none - good
    React.createElement(WrapperComponent, __assign({}, props, { myProp: '1000000' }));
    // Expected error, but got none - bad!
    React.createElement(WrapperComponent, __assign({}, props, { myProp: 1000000 }));
};
