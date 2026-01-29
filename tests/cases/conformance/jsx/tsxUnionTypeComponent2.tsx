// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: react
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

type Invalid1 = React.ComponentClass<any> | number;

const X: Invalid1 = 1;

<X />;


