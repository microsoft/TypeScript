// @Filename: thisTypeOfConstructorFunctions.js
// @allowJs: true
// @checkJs: true
// @noEmit: true

/**
 * @class
 * @template T
 * @param {T} t
 */
function Cp(t) {
    /** @type {this} */
    this.dit = this
    this.y = t
    /** @return {this} */
    this.m3 = () => this
}

Cp.prototype = {
    /** @return {this} */
    m4() {
        this.z = this.y; return this
    }
}

/**
 * @class
 * @template T
 * @param {T} t
 */
function Cpp(t) {
    this.y = t
}
/** @return {this} */
Cpp.prototype.m2 = function () {
    this.z = this.y; return this
}

var cp = new Cp(1)
var cpp = new Cpp(2)
cp.dit

/** @type {Cpp<number>} */
var cppn = cpp.m2()

/** @type {Cp<number>} */
var cpn = cp.m3()
/** @type {Cp<number>} */
var cpn = cp.m4()

