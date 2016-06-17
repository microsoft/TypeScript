// @allowJs: true
// @filename: constructstag4.js
// @out: dummy37.js
var Person = Class.create(/** @lends Person# */{

    /**
        Describe the constructor.
        @classdesc A class that represents a person.
        @constructs
        @param {string} name
     */
    initialize: function(name) {

        /** The name of the person. */
        this.name = name;
    },

    /**
        @param {string} message
     */
    say: function(message) {

        /** The person's message. */
        this.message = message;
    }
});
