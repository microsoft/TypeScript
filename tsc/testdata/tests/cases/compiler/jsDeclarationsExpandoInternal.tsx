// @allowJs: true
// @checkJs: true
// @jsx: react-jsx
// @declaration: true
// @emitDeclarationOnly: true
// @filename: src/main.jsx
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';

/**
 * @param {Object} args
 * @param {string} args.text
 */
function Internal(args) {
    return <div>{args.text}</div>
}
Internal.args = { text: 'text' };

export const PublicInternalBinding = Internal.bind({});
PublicInternalBinding.args = { text: 'bind text' };

/**
 * @param {Object} args
 * @param {string} args.text
 */
export function Exported(args) {
    return <div>{args.text}</div>
}
Exported.args = { text: 'text' };

export const PublicExportedBinding = Exported.bind({});
PublicExportedBinding.args = { text: 'bind text' };