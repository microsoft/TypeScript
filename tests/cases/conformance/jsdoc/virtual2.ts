// @allowJs: true
// @filename: virtual2.js
// @out: dummy183.js
var Person = Klass.extend(
/** @lends Person.prototype */
{
    /** @constructs Person */
    initialize: function(name) {
        this.name = name;
    },

    /**
     * Callback for `say`.
     *
     * @callback Person~sayCallback
     * @param {?string} err - Information about the error, if any.
     * @param {?string} message - The message.
     */
    /**
     * Speak a message asynchronously.
     *
     * @param {Person~sayCallback} cb
     */
    say: function(message, cb) {
        if (!message) {
            cb('You forgot the message!');
        }

        cb(null, this.name + ' says: ' + message);
    }
});
