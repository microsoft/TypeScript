// @allowJs: true
// @filename: constructstag3.js
// @out: dummy36.js
/**
    A class that represents a person.
    @class
 */
var Person = Class.create({

    /**
        @constructs Person
        @param {string} name
     */
    initialize: function(name) {

        /** The name of the person. */
        this.name = name;
    },

    /**
        @memberof Person#
        @param {string} message
     */
    say: function(message) {

        /** The person's message. */
        this.message = message;
    }
});
