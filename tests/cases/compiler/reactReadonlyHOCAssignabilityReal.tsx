// @strict: true
// @jsx: react
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

function myHigherOrderComponent<P>(Inner: React.ComponentClass<P & {name: string}>): React.ComponentClass<P> {
    return class OuterComponent extends React.Component<P> {
        render() {
            return <Inner {...this.props} name="Matt"/>;
        }
    };
}