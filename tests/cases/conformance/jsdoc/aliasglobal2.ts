// @allowJs: true
// @filename: aliasglobal2.js
// @out: dummy7.js
(function () {
    /**
     * Creates a new test object.
     * @alias Test
     * @constructor
     */
    var Test = function(testName) {
        /** Document me. */
        this.name = testName;
    }

    /** Document me. */
    Test.prototype.run = function(message) {
    };

    /** Document me. */
    Test.counter = 1;
})();