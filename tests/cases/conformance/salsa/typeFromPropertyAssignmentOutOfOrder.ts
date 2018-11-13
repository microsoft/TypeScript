// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es3
// @filename: index.js
First.Item = class I {}
Common.Object = class extends First.Item {}

Workspace.Object = class extends Common.Object {}

/** @type {Workspace.Object} */
var am;

// @filename: roots.js
var First = {};
var Common = {};
var Workspace = {};
