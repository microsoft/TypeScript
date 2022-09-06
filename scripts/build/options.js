// @ts-check
const minimist = require("minimist");
const os = require("os");

const ci = ["1", "true"].includes(process.env.CI);

/** @type {CommandLineOptions} */
module.exports = minimist(process.argv.slice(2), {
    boolean: ["dirty", "light", "colors", "lint", "lkg", "soft", "fix", "failed", "keepFailed", "force", "built", "ci"],
    string: ["browser", "tests", "break", "host", "reporter", "stackTraceLimit", "timeout", "shards", "shardId"],
    alias: {
        /* eslint-disable quote-props */
        "b": "browser",
        "i": ["inspect", "inspect-brk", "break", "debug", "debug-brk"],
        "t": ["tests", "test"],
        "ru": ["runners", "runner"],
        "r": "reporter",
        "c": ["colors", "color"],
        "skippercent": "skipPercent",
        "w": "workers",
        "f": "fix"
        /* eslint-enable quote-props */
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
        workers: process.env.workerCount || ((os.cpus().length - (ci ? 0 : 1)) || 1),
        failed: false,
        keepFailed: false,
        lkg: true,
        dirty: false,
        built: false,
        ci,
    }
});

if (module.exports.built) {
    module.exports.lkg = false;
}

/**
 * @typedef TypedOptions
 * @property {boolean} dirty
 * @property {boolean} light
 * @property {boolean} colors
 * @property {boolean} lint
 * @property {boolean} lkg
 * @property {boolean} built
 * @property {boolean} soft
 * @property {boolean} fix
 * @property {string} browser
 * @property {string} tests
 * @property {string | boolean} inspect
 * @property {string} runners
 * @property {string|number} workers
 * @property {string} host
 * @property {string} reporter
 * @property {string} stackTraceLimit
 * @property {string|number} timeout
 * @property {boolean} failed
 * @property {boolean} keepFailed
 * @property {boolean} ci
 *
 * @typedef {import("minimist").ParsedArgs & TypedOptions} CommandLineOptions
 */
void 0;
