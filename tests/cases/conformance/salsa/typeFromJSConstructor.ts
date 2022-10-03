// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @noImplicitAny: true
// @Filename: a.js
function Installer () {
    // arg: number
    this.arg = 0
    // unknown: string | boolean | null
    this.unknown = null
    // twice: string | undefined
    this.twice = undefined
    this.twice = 'hi'
    // twices: any[] | null
    this.twices = []
    this.twices = null
}
Installer.prototype.first = function () {
    this.arg = 'hi' // error
    this.unknown = 'hi' // ok
    this.newProperty = 1 // ok: number | boolean
    this.twice = undefined // ok
    this.twice = 'hi' // ok
}
Installer.prototype.second = function () {
    this.arg = false // error
    this.unknown = false // ok
    this.newProperty = false // ok
    this.twice = null // error
    this.twice = false // error
    this.twices.push(1) // error: Object is possibly null
    if (this.twices != null) {
        this.twices.push('hi')
    }
}
