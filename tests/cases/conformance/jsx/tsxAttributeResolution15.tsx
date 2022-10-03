// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @noImplicitAny: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

class BigGreeter extends React.Component<{ }, {}> {
    render() {
        return <div>Default hi</div>;
    }
    greeting: string;
}

// Error
let a = <BigGreeter prop1="hello" />

// OK
let b = <BigGreeter ref={(input) => { this.textInput = input; }} />
let c = <BigGreeter data-extra="hi" />