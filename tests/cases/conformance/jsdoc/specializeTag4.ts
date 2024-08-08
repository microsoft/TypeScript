// @checkJs: true
// @outDir: dist/
// @declaration: true
// @filename: specializeTag4.js

/**
 * @template {{ id: string }} T
 */
class Collection {
    /**
     * @param {string} name
     */
    constructor(name) {
        /** @type {string} */
        this.name = name;
    }

    /**
     * @param {string} id
     * @returns {T}
     */
    getById(id) {
        return /** @type {T} */({ id });
    }
}

/**
 * @typedef {object} UserData
 * @property {string} id
 * @property {string} name
 */

/** @specialize <UserData> */
const users = new Collection('users');

/** @specialize <number> */
const numbers = new Collection('numbers');
