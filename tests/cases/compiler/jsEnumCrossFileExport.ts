// @noEmit: true
// @checkJs: true
// @allowJs: true
// @filename: enumDef.js
var Host = {};
Host.UserMetrics = {};
/** @enum {number} */
Host.UserMetrics.Action = {
    WindowDocked: 1,
    WindowUndocked: 2,
    ScriptsBreakpointSet: 3,
    TimelineStarted: 4,
};
/**
 * @typedef {string} Host.UserMetrics.Bargh
 */
/**
 * @typedef {string}
 */
Host.UserMetrics.Blah = {
    x: 12
}
// @filename: index.js
var Other = {};
Other.Cls = class {
    /**
     * @param {!Host.UserMetrics.Action} p
     */
    method(p) {}
    usage() {
        this.method(Host.UserMetrics.Action.WindowDocked);
    }
}

/**
 * @type {Host.UserMetrics.Bargh}
 */
var x = "ok";

/**
 * @type {Host.UserMetrics.Blah}
 */
var y = "ok";
