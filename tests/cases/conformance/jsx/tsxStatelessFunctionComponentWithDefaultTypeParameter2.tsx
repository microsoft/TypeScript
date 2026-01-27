// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react')

interface MyComponentProp {
    values: string;
}

function MyComponent1<T extends MyComponentProp>(attr: T) {
    return <div>attr.values</div>
}


// Error
let i1 = <MyComponent1 values={5}/>;