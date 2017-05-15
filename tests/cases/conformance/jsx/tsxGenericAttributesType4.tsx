// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

class B1<T extends { x: string }> extends React.Component<T, {}> {
    render() {
        return <div>hi</div>; 
    }
}
class B<U> extends React.Component<U, {}> {
    render() {
        // Should be an ok but as of 2.3.3 this will be an error as we will instantiate B1.props to be empty object
        return <B1 {...this.props} x="hi" />;
    }
}