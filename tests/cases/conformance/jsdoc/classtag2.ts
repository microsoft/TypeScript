// @allowJs: true
// @filename: classtag2.js
// @out: dummy29.js
/**
 * Describe the Subscription class here.
 */
class Subscription {
    /**
     * Describe the constructor here.
     *
     * @param {string} name - The name of the subscription.
     */
    constructor(name) {}

    /** Force the subscription to expire. */
    expire() {}
}

/**
 * Describe the Subscriber class here.
 */
const Subscriber = class Foo {
    /**
     * Describe the constructor here.
     *
     * @param {string} name - The name of the subscriber.
     */
    constructor(name) {}

    /** Check whether the subscriber has a callback. */
    hasCallback() {}
}

/**
 * Subclass namespace.
 * @namespace
 */
let subclasses = {};

/**
 * Expiring subscription subclass.
 * @class
 */
subclasses.ExpiringSubscription = class ExpiringSubscription {
    /**
     * Describe the constructor here.
     *
     * @param {string} name - The name of the subscription.
     */
    constructor(name) {}
}

/** @memberof subclasses */
class InvalidSubscription {
    /** Instance method. */
    foo() {}
}
