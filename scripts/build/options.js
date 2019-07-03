// @ts-check
const minimist = require("minimist");
const os = require("os");

/** @type {CommandLineOptions} */
module.exports = minimist(process.argv.slice(2), {
    boolean: ["debug", "dirty", "inspect", "light", "colors", "lint", "lkg", "soft", "fix", "failed", "keepFailed", "force", "built"],
    string: ["browser", "tests", "host", "reporter", "stackTraceLimit", "timeout", "shards", "shardId"],
    alias: {
        "b": "browser",
        "d": "debug", "debug-brk": "debug",
        "i": "inspect", "inspect-brk": "inspect",
        "t": "tests", "test": "tests",
        "ru": "runners", "runner": "runners",
        "r": "reporter",
        "c": "colors", "color": "colors",
        "skip-percent": "skipPercent",
        "w": "workers",
        "f": "fix"
    },
    default: {
        soft: false,
        colors: process.env.colors || process.env.color || true,
        debug: process.env.debug || process.env["debug-brk"] || process.env.d,
        inspect: process.env.inspect || process.env["inspect-brk"] || process.env.i,
        host: process.env.TYPESCRIPT_HOST || process.env.host || "node",
        browser: process.env.browser || process.env.b || (os.platform() === "win32" ? "edge" : "chrome"),
        timeout: process.env.timeout || 40000,
        tests: process.env.test || process.env.tests || process.env.t,
        runners: process.env.runners || process.env.runner || process.env.ru,
        light: process.env.light === undefined || process.env.light !== "false",
        reporter: process.env.reporter || process.env.r,
        lint: process.env.lint || true,
        fix: process.env.fix || process.env.f,
        workers: process.env.workerCount || os.cpus().length,
        failed: false,
        keepFailed: false,
        lkg: true,
        dirty: false,
        built: false
    }
});

if (module.exports.built) {
    module.exports.lkg = false;
}

/**
 * @typedef TypedOptions
 * @property {boolean} debug
 * @property {boolean} dirty
 * @property {boolean} inspect
 * @property {boolean} light
 * @property {boolean} colors
 * @property {boolean} lint
 * @property {boolean} lkg
 * @property {boolean} built
 * @property {boolean} soft
 * @property {boolean} fix
 * @property {string} browser
 * @property {string} tests
 * @property {string} runners
 * @property {string|number} workers
 * @property {string} host
 * @property {string} reporter
 * @property {string} stackTraceLimit
 * @property {string|number} timeout
 * @property {boolean} failed
 * @property {boolean} keepFailed
 *
 * @typedef {import("minimist").ParsedArgs & TypedOptions} CommandLineOptions
 */
void 0;
