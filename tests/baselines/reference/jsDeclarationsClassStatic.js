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
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Object.defineProperty(Handler, "OPTIONS", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Handler.prototype.process = function () {
    };
    return Handler;
}());
Handler.statische = function () { };
var Strings = {
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
export = Handler;
declare class Handler {
    static get OPTIONS(): number;
    process(): void;
}
declare namespace Handler {
    export { statische, Strings, HandlerOptions };
}
declare function statische(): void;
declare namespace Strings {
    export const a: string;
    export const b: string;
}
type HandlerOptions = {
    /**
     * Should be able to export a type alias at the same time.
     */
    name: string;
};
