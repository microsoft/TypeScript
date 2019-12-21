// @noEmit: true
// @checkJs: true
// @allowJs: true
// @filename: index.js
/** @enum {string} */
const Thing = Object.freeze({
    a: "thing",
    b: "chill"
});

exports.Thing = Thing;

/**
 * @param {Thing} x
 */
function useThing(x) {}

exports.useThing = useThing;

/**
 * @param {(x: Thing) => void} x
 */
function cbThing(x) {}

exports.cbThing = cbThing;

// @filename: usage.js

const { Thing, useThing, cbThing } = require("./index");

useThing(Thing.a);

/**
 * @typedef {Object} LogEntry
 * @property {string} type
 * @property {number} time
 */

cbThing(type => {
    /** @type {LogEntry} */
    const logEntry = {
        time: Date.now(),
        type,
    };
});
