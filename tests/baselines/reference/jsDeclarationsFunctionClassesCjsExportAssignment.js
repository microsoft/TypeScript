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
    construct: function (input, handle) {
        if (handle === void 0) { handle = function () { return void 0; }; }
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
/**
 * @param {number} timeout
 */
declare function Timer(timeout: number): void;
declare class Timer {
    /**
     * @param {number} timeout
     */
    constructor(timeout: number);
    timeout: number;
}
//// [context.d.ts]
export = Context;
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
declare function Context(input: Input): Context;
declare class Context {
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
    constructor(input: Input);
    state: any;
    /**
     * @param {Input} input
     * @param {HookHandler=} handle
     * @returns {State}
     */
    construct(input: Input, handle?: HookHandler | undefined): State;
}
declare namespace Context {
    export { Timer, Hook, HookHandler, Input, State };
}
/**
 * Imports
 */
type Timer = import("./timer");
/**
 * Imports
 */
type Hook = import("./hook");
/**
 * Imports
 */
type HookHandler = import("./hook").HookHandler;
/**
 * Input type definition
 */
type Input = {
    timer: Timer;
    hook: Hook;
};
/**
 * State type definition
 */
type State = {
    timer: Timer;
    hook: Hook;
};
//// [hook.d.ts]
export = Hook;
/**
 * @typedef {(arg: import("./context")) => void} HookHandler
 */
/**
 * @param {HookHandler} handle
 */
declare function Hook(handle: HookHandler): void;
declare class Hook {
    /**
     * @typedef {(arg: import("./context")) => void} HookHandler
     */
    /**
     * @param {HookHandler} handle
     */
    constructor(handle: HookHandler);
    handle: HookHandler;
}
declare namespace Hook {
    export { HookHandler };
}
type HookHandler = (arg: import("./context")) => void;
