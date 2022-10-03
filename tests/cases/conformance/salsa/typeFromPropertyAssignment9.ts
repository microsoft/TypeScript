// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: a.js

var my = my || {};
/** @param {number} n */
my.method = function(n) {
    return n + 1;
}
my.number = 1;
my.object = {};
my.predicate = my.predicate || {};
my.predicate.query = function () {
    var me = this;
    me.property = false;
};
var q = new my.predicate.query();
my.predicate.query.another = function () {
    return 1;
}
my.predicate.query.result = 'none'
/** @param {number} first
 *  @param {number} second
 */
my.predicate.sort = my.predicate.sort || function (first, second) {
    return first > second ? first : second;
}
my.predicate.type = class {
    m() { return 101; }
}


// global-ish prefixes
var min = window.min || {};
min.nest = this.min.nest || function () { };
min.nest.other = self.min.nest.other || class { };
min.property = global.min.property || {};
