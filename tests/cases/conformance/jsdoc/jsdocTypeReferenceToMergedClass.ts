// https://github.com/microsoft/TypeScript/issues/34685
// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: test.js
/** @param {Workspace.Project} p */
function demo(p) {
    p.isServiceProject()
}
// @Filename: mod1.js
// Note: mod1.js needs to appear second to trigger the bug
var Workspace = {}
Workspace.Project = function wp() { }
Workspace.Project.prototype = {
  isServiceProject() {}
}
