// @allowJs: true
// @filename: mixintag.js
// @out: dummy110.js
/**
 * This provides methods used for event handling. It's not meant to
 * be used directly, except as a provider of related methods.
 *
 * @mixin
 */
var Eventful = {
    /** fires something. */
    fires: function () {},
    /** handles a signal. */
    on: function () {}
};

/**
 * @constructor
 * @mixes Eventful
 */
var FormButton = function() {
};

/** @mixin AnotherMixin*/

/** I mix in multiple things
 * @constructor MyClass
 * @mixes Eventful
 * @mixes AnotherMixin */
