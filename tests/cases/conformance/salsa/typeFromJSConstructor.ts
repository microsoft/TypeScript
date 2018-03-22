// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @Filename: a.js
function Installer () {
    this.arg = 0
    this.unknown = null
}
Installer.prototype.first = function () {
    this.arg = 'hi' // error
    this.unknown = 'hi' // ok
    this.newProperty = 1 // ok
}
Installer.prototype.second = function () {
    this.arg = false // error
    this.unknown = false // ok
    this.newProperty = false // ok
}
