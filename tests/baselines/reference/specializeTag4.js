//// [tests/cases/conformance/jsdoc/specializeTag4.ts] ////

//// [specializeTag4.js]
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


//// [specializeTag4.js]
/**
 * @template {{ id: string }} T
 */
var Collection = /** @class */ (function () {
    /**
     * @param {string} name
     */
    function Collection(name) {
        /** @type {string} */
        this.name = name;
    }
    /**
     * @param {string} id
     * @returns {T}
     */
    Collection.prototype.getById = function (id) {
        return /** @type {T} */ ({ id: id });
    };
    return Collection;
}());
/**
 * @typedef {object} UserData
 * @property {string} id
 * @property {string} name
 */
/** @specialize <UserData> */
var users = new Collection('users');
/** @specialize <number> */
var numbers = new Collection('numbers');


//// [specializeTag4.d.ts]
/**
 * @template {{ id: string }} T
 */
declare class Collection<T extends {
    id: string;
}> {
    /**
     * @param {string} name
     */
    constructor(name: string);
    /** @type {string} */
    name: string;
    /**
     * @param {string} id
     * @returns {T}
     */
    getById(id: string): T;
}
/**
 * @typedef {object} UserData
 * @property {string} id
 * @property {string} name
 */
/** @specialize <UserData> */
declare const users: Collection<UserData>;
/** @specialize <number> */
declare const numbers: Collection<number>;
type UserData = {
    id: string;
    name: string;
};
