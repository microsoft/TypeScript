// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')

interface MyComponentProp {
    values: string;
}

function MyComponent<T = MyComponentProp>(attr: T) {
    return <div>attr.values</div>
}

// OK
let i = <MyComponent values />;  // We infer type arguments here
let i1 = <MyComponent values="Hello"/>;