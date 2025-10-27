//// [tests/cases/conformance/jsx/tsxUnionTypeComponent1.tsx] ////

//// [file.tsx]
import React = require('react');

interface ComponentProps {
    AnyComponent: React.StatelessComponent<any> | React.ComponentClass<any>;
}

class MyComponent extends React.Component<ComponentProps, {}> {
    render() {
        const { AnyComponent } = this.props;
        return (<AnyComponent />);
    }
}

// Stateless Component As Props
<MyComponent AnyComponent={() => <button>test</button>}/>

// Component Class as Props
class MyButtonComponent extends React.Component<{},{}> {
}

<MyComponent AnyComponent={MyButtonComponent} />



//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MyComponent extends React.Component {
    render() {
        const { AnyComponent } = this.props;
        return (React.createElement(AnyComponent, null));
    }
}
// Stateless Component As Props
React.createElement(MyComponent, { AnyComponent: () => React.createElement("button", null, "test") });
// Component Class as Props
class MyButtonComponent extends React.Component {
}
React.createElement(MyComponent, { AnyComponent: MyButtonComponent });
