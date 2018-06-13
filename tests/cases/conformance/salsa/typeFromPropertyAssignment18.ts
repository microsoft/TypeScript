// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
var GLOBSTAR = m.GLOBSTAR = {}
function m() {
    return 11
}
GLOBSTAR.p = 1
m.GLOBSTAR.q = 2

GLOBSTAR.p
GLOBSTAR.q
m.GLOBSTAR.p
m.GLOBSTAR.q

var snd = f.snd = function() {
    return 101
}
function f() {
    return 1001
}
snd.p = 3
f.snd.q = 4

snd.p
snd.q
f.snd.p
f.snd.q
