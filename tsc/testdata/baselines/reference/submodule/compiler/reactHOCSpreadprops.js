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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
function f(App) {
    class C extends React.Component {
        render() {
            return <App {...this.props}/>;
        }
    }
}
