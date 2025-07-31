//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassStatic.ts] ////

//// [source.js]
class Handler {
	static get OPTIONS() {
		return 1;
	}

	process() {
	}
}
Handler.statische = function() { }
const Strings = {
    a: "A",
    b: "B"
}

module.exports = Handler;
module.exports.Strings = Strings

/**
 * @typedef {Object} HandlerOptions
 * @property {String} name
 * Should be able to export a type alias at the same time.
 */


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    static get OPTIONS() {
        return 1;
    }
    process() {
    }
}
Handler.statische = function () { };
const Strings = {
    a: "A",
    b: "B"
};
export = Handler;
module.exports = Handler;
export var Strings = Strings;
module.exports.Strings = Strings;
/**
 * @typedef {Object} HandlerOptions
 * @property {String} name
 * Should be able to export a type alias at the same time.
 */


//// [source.d.ts]
export = Handler;
export var Strings = Strings;
export type HandlerOptions = {
    name: String;
};
/**
 * @typedef {Object} HandlerOptions
 * @property {String} name
 * Should be able to export a type alias at the same time.
 */
