// @allowJs: true
// @filename: lends6.js
// @out: dummy96.js
define([], function() {
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

    var Robot = makeClass(
        /** @lends Robot.prototype */
        {
            /** @constructs */
            initialize: function(name) {
                this.name = name;
            },
            /** Feign emotion. */
            emote: function() {
                return this.name + " loves you!";
            }
        }
    );
});
