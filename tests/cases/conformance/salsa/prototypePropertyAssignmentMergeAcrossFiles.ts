// @Filename: prototypePropertyAssignmentMergeAcrossFiles.js
// @allowJs: true
// @checkJs: true
// @noEmit: true
function C() {
    this.a = 1
}

// @Filename: other.js
C.prototype.foo = function() { return this.a }
