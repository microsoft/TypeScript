// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es6
// @Filename: a.js

// TODO: JSDoc would provide a contextual type, so ... I should test that
//  (a number of existing tests fail because of that, I think)
// TODO: Try initializer of function or class I guess (though classes aren't context sensitive)
// TODO: Duplicated declarations should be OK (if they have the same type (??))
var my = my || {};
my.m = function() {
    return 1;
}
my.n = 1;
my.o = {};
my.predicate = my.predicate || {};
my.predicate.query = function () {
    var me = this;
    me.property = false;
};
var q = new my.predicate.query();
my.predicate.query.result = 'none'
// my.predicate.sort = my.predicate.sort || function (first, second) {
    // return first;
// }
