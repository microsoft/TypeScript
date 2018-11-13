// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @Filename: npm-install.js
function Installer () {
    this.args = 0
}
Installer.prototype.loadArgMetadata = function (next) {
    // ArrowFunction isn't treated as a this-container
    (args) => {
        this.args = 'hi'
        this.newProperty = 1
    }
}
var i = new Installer()
i.newProperty = i.args // ok, number ==> number | undefined
