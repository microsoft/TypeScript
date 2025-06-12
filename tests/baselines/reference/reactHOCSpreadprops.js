//// [tests/cases/compiler/reactHOCSpreadprops.tsx] ////

//// [reactHOCSpreadprops.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React = require("react");
function f<P>(App: React.ComponentClass<P> | React.StatelessComponent<P>): void {
    class C extends React.Component<P & { x: number }> {
        render() {
            return <App {...this.props} />;
        }
    }
}


//// [reactHOCSpreadprops.js]
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
function f(App) {
    class C extends React.Component {
        render() {
            return React.createElement(App, __assign({}, this.props));
        }
    }
}
