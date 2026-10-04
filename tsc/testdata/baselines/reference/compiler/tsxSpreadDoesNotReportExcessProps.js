//// [tests/cases/compiler/tsxSpreadDoesNotReportExcessProps.tsx] ////

//// [tsxSpreadDoesNotReportExcessProps.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

class MyComponent extends React.Component<{dataSource: number[], onClick?: any}, {}> {
    render() {
        return (<div {...this.props} className="ok"></div>);
    }
}


//// [tsxSpreadDoesNotReportExcessProps.js]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";
class MyComponent extends React.Component {
    render() {
        return (React.createElement("div", Object.assign({}, this.props, { className: "ok" })));
    }
}
