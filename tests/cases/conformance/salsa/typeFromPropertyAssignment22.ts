// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: npm-install.js
function Installer (where, dryrun, args, opts) {
  this.args = args
}
Installer.prototype.loadArgMetadata = function (next) {
  // ArrowFunction isn't treated as a this-container
  (args) => {
    this.args = args
      this.newProperty = 1
  }
}
