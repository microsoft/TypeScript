// @strict: true
function f(b: boolean) {
    function d() {
    }
    d.e = 12
    d.e

    if (b) {
        d.q = false
    }
    // error d.q might not be assigned
    d.q
    if (b) {
        d.q = false
    }
    else {
        d.q = true
    }
    d.q
    if (b) {
        d.r = 1
    }
    else {
        d.r = 2
    }
    d.r
    if (b) {
        d.s = 'hi'
    }
    return d
}
// OK to access possibly-unassigned properties outside the initialising scope
var test = f(true).s

function d() {
}
d.e = 12
d.e

if (!!false) {
    d.q = false
}
d.q
if (!!false) {
    d.q = false
}
else {
    d.q = true
}
d.q
if (!!false) {
    d.r = 1
}
else {
    d.r = 2
}
d.r

// test function expressions too
const g = function() {
}
if (!!false) {
    g.expando = 1
}
g.expando // error

if (!!false) {
    g.both = 'hi'
}
else {
    g.both = 0
}
g.both
