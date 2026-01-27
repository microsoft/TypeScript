// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

interface Prop {
    x: false;
}
class Poisoned extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// Error
let p = <Poisoned x/>;