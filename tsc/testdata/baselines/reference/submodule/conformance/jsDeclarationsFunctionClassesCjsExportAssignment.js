//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionClassesCjsExportAssignment.ts] ////

//// [timer.js]
/**
 * @param {number} timeout
 */
function Timer(timeout) {
    this.timeout = timeout;
}
module.exports = Timer;
//// [hook.js]
/**
 * @typedef {(arg: import("./context")) => void} HookHandler
 */
/**
 * @param {HookHandler} handle
 */
function Hook(handle) {
    this.handle = handle;
}
module.exports = Hook;

//// [context.js]
/**
 * Imports
 *
 * @typedef {import("./timer")} Timer
 * @typedef {import("./hook")} Hook
 * @typedef {import("./hook").HookHandler} HookHandler
 */

/**
 * Input type definition
 *
 * @typedef {Object} Input
 * @prop {Timer} timer
 * @prop {Hook} hook
 */
 
/**
 * State type definition
 *
 * @typedef {Object} State
 * @prop {Timer} timer
 * @prop {Hook} hook
 */

/**
 * New `Context`
 *
 * @class
 * @param {Input} input
 */

function Context(input) {
    if (!(this instanceof Context)) {
      return new Context(input)
    }
    this.state = this.construct(input);
}
Context.prototype = {
    /**
     * @param {Input} input
     * @param {HookHandler=} handle
     * @returns {State}
     */
    construct(input, handle = () => void 0) {
        return input;
    }
}
module.exports = Context;


//// [timer.js]
/**
 * @param {number} timeout
 */
function Timer(timeout) {
    this.timeout = timeout;
}
module.exports = Timer;
//// [context.js]
/**
 * Imports
 *
 * @typedef {import("./timer")} Timer
 * @typedef {import("./hook")} Hook
 * @typedef {import("./hook").HookHandler} HookHandler
 */
/**
 * Input type definition
 *
 * @typedef {Object} Input
 * @prop {Timer} timer
 * @prop {Hook} hook
 */
/**
 * State type definition
 *
 * @typedef {Object} State
 * @prop {Timer} timer
 * @prop {Hook} hook
 */
/**
 * New `Context`
 *
 * @class
 * @param {Input} input
 */
function Context(input) {
    if (!(this instanceof Context)) {
        return new Context(input);
    }
    this.state = this.construct(input);
}
Context.prototype = {
    /**
     * @param {Input} input
     * @param {HookHandler=} handle
     * @returns {State}
     */
    construct(input, handle = () => void 0) {
        return input;
    }
};
module.exports = Context;
//// [hook.js]
/**
 * @typedef {(arg: import("./context")) => void} HookHandler
 */
/**
 * @param {HookHandler} handle
 */
function Hook(handle) {
    this.handle = handle;
}
module.exports = Hook;


//// [timer.d.ts]
export = Timer;
//// [context.d.ts]
/**
 * Imports
 *
 * @typedef {import("./timer")} Timer
 * @typedef {import("./hook")} Hook
 * @typedef {import("./hook").HookHandler} HookHandler
 */
export type Timer = import("./timer");
export type Hook = import("./hook");
export type HookHandler = import("./hook").HookHandler;
export type Input = {
    timer: Timer;
    hook: Hook;
};
export type State = {
    timer: Timer;
    hook: Hook;
};
/**
 * Input type definition
 *
 * @typedef {Object} Input
 * @prop {Timer} timer
 * @prop {Hook} hook
 */
/**
 * State type definition
 *
 * @typedef {Object} State
 * @prop {Timer} timer
 * @prop {Hook} hook
 */
/**
 * New `Context`
 *
 * @class
 * @param {Input} input
 */
declare function Context(input: Input): any;
declare namespace Context {
    var prototype: {
        /**
         * @param {Input} input
         * @param {HookHandler=} handle
         * @returns {State}
         */
        construct(input: Input, handle?: any): State;
    };
}
export = Context;
//// [hook.d.ts]
export type HookHandler = (arg: import("./context")) => void;
export = Hook;
