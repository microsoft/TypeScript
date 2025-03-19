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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
function myHigherOrderComponent(Inner) {
    return class OuterComponent extends React.Component {
        render() {
            return <Inner {...this.props} name="Matt"/>;
        }
    };
}
