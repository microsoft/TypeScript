// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: bug39167.js
var test = {};
test.K = test.K ||
    function () {}

test.K.prototype = {
    add() {}
};

new test.K().add;
