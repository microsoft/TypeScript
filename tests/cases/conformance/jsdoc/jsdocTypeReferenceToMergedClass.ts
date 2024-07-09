// https://github.com/microsoft/TypeScript/issues/34685
// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: jsdocTypeReferenceToMergedClass.js
var Workspace = {}
/** @type {Workspace.Project} */
var p;
p.isServiceProject()

Workspace.Project = function wp() { }
Workspace.Project.prototype = {
  isServiceProject() {}
}
