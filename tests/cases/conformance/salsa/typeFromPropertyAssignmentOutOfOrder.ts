// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es3
// @filename: index.js
Common.Item = class I {}
Common.Object = class extends Common.Item {}

Workspace.Object = class extends Common.Object {}

/** @type {Workspace.Object} */
var am;

// @filename: roots.js
var Common = {};
var Workspace = {};
