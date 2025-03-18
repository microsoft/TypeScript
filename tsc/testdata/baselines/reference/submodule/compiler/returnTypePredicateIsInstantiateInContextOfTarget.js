//// [tests/cases/compiler/returnTypePredicateIsInstantiateInContextOfTarget.tsx] ////

//// [returnTypePredicateIsInstantiateInContextOfTarget.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
class TestComponent extends React.Component<{ isAny: <T>(obj: any) => obj is T }> {
    static defaultProps = {
        isAny: TestComponent.isAny
    }

    // Type guard is defined as a static class property
    static isAny<T>(obj: any): obj is T {
        return true;
    }
}

const TestRender = () => <TestComponent />;

//// [returnTypePredicateIsInstantiateInContextOfTarget.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TestComponent extends React.Component {
    static defaultProps = {
        isAny: TestComponent.isAny
    };
    static isAny(obj) {
        return true;
    }
}
const TestRender = () => <TestComponent />;
