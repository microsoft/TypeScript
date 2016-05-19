// @filename: file.tsx
// @jsx: react
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface ComponentProps {
    AnyComponent: React.StatelessComponent<any> | React.ComponentClass<any>;
}

class MyComponent extends React.Component<ComponentProps, {}> {
    render() {
        const { AnyComponent } = this.props;
        const someProps = {};
        const button = <AnyComponent {...someProps}/>
        return (<div>{button}</div>);
    }
}

<MyComponent AnyComponent={() => <button>test</button>}/>

class MyButtonComponent extends React.Component<{},{}> {
}

<MyComponent AnyComponent={MyButtonComponent} />

type Invalid = string | React.ComponentClass<any>;

var X: Invalid = "";

<X /> // Should fail
