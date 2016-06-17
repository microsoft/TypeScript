// @allowJs: true
// @filename: moduleisconstructor2.js
// @out: dummy114.js
/**
 * Describe the module here.
 * @module mymodule/config
 */

/** Describe the class here. */
export default class Config {
    /**
     * Create a new configuration.
     * @param {string} id
     */
    constructor(id) {
        /** Document me. */
        this.id = id;
    }

    /**
     * Get the configuration ID.
     *
     * @return {string} The configuration ID.
     */
    getId() {
        return this.id;
    }
}
