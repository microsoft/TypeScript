// @allowJs: true
// @filename: lends.js
// @out: dummy91.js
/** @class */
var Person = makeClass(
    /** @lends Person# */
    {
        /** Set up initial values. */
        initialize: function(name) {
            /** The name of the person. */
            this.name = name;
        },

        /** Speak a message. */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);