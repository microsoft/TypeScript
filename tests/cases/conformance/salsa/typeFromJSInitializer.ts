// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @noImplicitAny: true
// @Filename: a.js
function A () {
    // should get any on this-assignments in constructor
    this.unknown = null
    this.unknowable = undefined
    this.empty = []
}
var a = new A()
a.unknown = 1
a.unknown = true
a.unknown = {}
a.unknown = 'hi'
a.unknowable = 1
a.unknowable = true
a.unknowable = {}
a.unknowable = 'hi'
a.empty.push(1)
a.empty.push(true)
a.empty.push({})
a.empty.push('hi')

/** @type {number | undefined} */
var n;

// should get any on parameter initialisers
function f(a = null, b = n, l = []) {
    // a should be null in strict mode
    a = undefined
    a = null
    a = 1
    a = true
    a = {}
    a = 'ok'

    // b should be number | undefined, not any
    b = 1
    b = undefined
    b = 'error'

    // l should be any[]
    l.push(1)
    l.push('ok')
}

// should get any on variable initialisers
var u = undefined;
var l = [];
u = undefined
u = 1
u = true
u = {}
u = 'ok'

l.push('ok')

/** @type {(v: unknown) => v is undefined} */
const isUndef = v => v === undefined;
const e = [1, undefined];

// should be undefined[]
const g = e.filter(isUndef);
