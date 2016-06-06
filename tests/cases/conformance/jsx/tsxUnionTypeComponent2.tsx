// @filename: file.tsx
// @jsx: react
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

type Invalid1 = React.ComponentClass<any> | string;

const X: Invalid1 = "Should fail to construct";

<X />;


