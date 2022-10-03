// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @declaration: true
// @strict: true
// @esModuleInterop: true
// @jsx: react
// @noImplicitAny: false
// @filename: jsxDeclarationsWithEsModuleInteropNoCrash.jsx
/// <reference path="/.lib/react16.d.ts" />
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  bar: PropTypes.bool,
};

const defaultProps = {
  bar: false,
};

function Foo({ bar }) {
  return <div>{bar}</div>;
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;