//// [tests/cases/compiler/reactReadonlyHOCAssignabilityReal.tsx] ////

//// [reactReadonlyHOCAssignabilityReal.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

function myHigherOrderComponent<P>(Inner: React.ComponentClass<P & {name: string}>): React.ComponentClass<P> {
    return class OuterComponent extends React.Component<P> {
        render() {
            return <Inner {...this.props} name="Matt"/>;
        }
    };
}

//// [reactReadonlyHOCAssignabilityReal.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = require("react");
function myHigherOrderComponent(Inner) {
    return class OuterComponent extends React.Component {
        render() {
            return React.createElement(Inner, __assign({}, this.props, { name: "Matt" }));
        }
    };
}
