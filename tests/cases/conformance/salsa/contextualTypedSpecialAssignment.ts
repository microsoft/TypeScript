// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: test.js
// @strict: true
/** @typedef {{
    status: 'done'
    m(n: number): void
}} DoneStatus */

// property assignment
var ns = {}
/** @type {DoneStatus} */
ns.x = {
    status: 'done',
    m(n) { }
}

ns.x = {
    status: 'done',
    m(n) { }
}
ns.x


// this-property assignment
class Thing {
    constructor() {
        /** @type {DoneStatus} */
        this.s = {
            status: 'done',
            m(n) { }
        }
    }

    fail() {
        this.s = {
            status: 'done',
            m(n) { }
        }
    }
}

// exports-property assignment

/** @type {DoneStatus} */
exports.x = {
    status: "done",
    m(n) { }
}
exports.x

/** @type {DoneStatus} */
module.exports.y = {
    status: "done",
    m(n) { }
}
module.exports.y

// prototype-property assignment
/** @type {DoneStatus} */
Thing.prototype.x = {
    status: 'done',
    m(n) { }
}
Thing.prototype.x

// prototype assignment
function F() {
}
/** @type {DoneStatus} */
F.prototype = {
    status: "done",
    m(n) { }
}

// @Filename: mod.js
// module.exports assignment
/** @type {{ status: 'done', m(n: number): void }} */
module.exports = {
    status: "done",
    m(n) { }
}
