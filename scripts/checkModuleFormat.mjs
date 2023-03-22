import { createRequire } from "module";
import { __importDefault, __importStar } from "tslib";

// This script tests that TypeScript's CJS API is structured
// as expected. It calls "require" as though it were in CWD,
// so it can be tested on a separate install of TypeScript.

const require = createRequire(process.cwd() + "/index.js");

console.log(`Testing ${process.argv[2]}...`);
const ts = require(process.argv[2]);

// See: https://github.com/microsoft/TypeScript/pull/51474#issuecomment-1310871623
/** @type {[fn: (() => any), shouldSucceed: boolean][]} */
const fns = [
    [() => ts.version,                          true],
    [() => ts.default.version,                  false],
    [() => __importDefault(ts).version,         false],
    [() => __importDefault(ts).default.version, true],
    [() => __importStar(ts).version,            true],
    [() => __importStar(ts).default.version,    true],
];

for (const [fn, shouldSucceed] of fns) {
    let success = false;
    try {
        success = !!fn();
    }
    catch {
        // Ignore
    }
    const status = success ? "succeeded" : "failed";
    if (success === shouldSucceed) {
        console.log(`${fn.toString()} ${status} as expected.`);
    }
    else {
        console.log(`${fn.toString()} unexpectedly ${status}.`);
        process.exitCode = 1;
    }
}
console.log("ok");
