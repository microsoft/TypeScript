// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

interface Prop {
    x: boolean;
}
class Poisoned extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// OK
let p = <Poisoned x/>;