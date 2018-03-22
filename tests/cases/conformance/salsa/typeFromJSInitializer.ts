// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @Filename: a.js
function A () {
    this.arg = 0
    this.unknown = null
    this.unknowable = undefined
    this.empty = []
}
A.prototype.m = function () {
    this.unknown = 1
    this.unknown = true
    this.unknown = {}
    this.unknown = 'hi'
    this.unknowable = 1
    this.unknowable = true
    this.unknowable = {}
    this.unknowable = 'hi'
    this.empty.push(1)
    this.empty.push(true)
    this.empty.push({})
    this.empty.push('hi')
}
A.prototype.second = function () {
    this.arg = false // error
    this.newProperty = false // should be ok
}

function f(a = null) {
    a = 1
    a = true
    a = {}
    a = 'hi'
}
