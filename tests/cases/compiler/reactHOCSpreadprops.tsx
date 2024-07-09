// @jsx: react
// @strict: true
/// <reference path="/.lib/react16.d.ts" />
import React = require("react");
function f<P>(App: React.ComponentClass<P> | React.StatelessComponent<P>): void {
    class C extends React.Component<P & { x: number }> {
        render() {
            return <App {...this.props} />;
        }
    }
}
