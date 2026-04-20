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
module.exports = Handler;
module.exports.Strings = Strings;
/**
 * @typedef {Object} HandlerOptions
 * @property {String} name
 * Should be able to export a type alias at the same time.
 */


//// [source.d.ts]
declare class Handler {
    static get OPTIONS(): number;
    process(): void;
}
declare namespace Handler {
    var statische: () => void;
}
declare const Strings: {
    a: string;
    b: string;
};
export = Handler;
export { Strings };
export type HandlerOptions = {
    name: string;
};
/**
 * @typedef {Object} HandlerOptions
 * @property {String} name
 * Should be able to export a type alias at the same time.
 */
