// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: a.js

// TODO: JSDoc would provide a contextual type, so ... I should test that
var my = my || {};
my.method = function() {
    return 1;
}
my.number = 1;
my.object = {};
my.predicate = my.predicate || {};
my.predicate.query = function () {
    var me = this;
    me.property = false;
};
var q = new my.predicate.query();
my.predicate.query.result = 'none'
my.predicate.sort = my.predicate.sort || function (first, second) {
    return first;
}
my.predicate.type = class {
    m() { return 101; }
}


// global-ish prefixes
var min = window.min || {};
min.nest = this.min.nest || function () { };
min.nest.other = self.min.nest.other || class { };
min.property = global.min.property || {};
