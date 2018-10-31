// @esModuleInterop: true
// @skipLibCheck: true
// @jsx: react
// @strict: true
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

class MyComponent extends React.Component<{dataSource: number[], onClick?: any}, {}> {
    render() {
        return (<div {...this.props} className="ok"></div>);
    }
}
