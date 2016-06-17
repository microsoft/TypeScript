// @allowJs: true
// @filename: getset.js
// @out: dummy74.js
/** @class */
var Person = makeClass(
    /** @lends Person# */
    {
        /** Set up initial values. */
        initialize: function(name) {
        },

        /** Speak a message. */
        say: function(message) {
            return this.name + " says: " + message;
        },

        /**
         * The name of the person.
         * @type {string}
         */
        get name() {
            return this._name;
        },

        /**
         * @type {string}
         * @param val
         */
        set name(val) {
            this._name = name;
        },

        /**
         * @type {number}
         */
        get age() {
            return 25;
        }
    }
);
