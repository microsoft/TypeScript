// @allowJs: true
// @filename: lends4.js
// @out: dummy94.js
define([], function () {
    var Person = makeClass(
        /** @lends Person.prototype */
        {
            /** @constructs */
            initialize: function(name) {
                this.name = name;
            },
            /** Speak a message. */
            say: function(message) {
                return this.name + " says: " + message;
            }
        }
    );
    return Person;
});
