import { createRequire } from "module";
import {
    __importDefault,
    __importStar,
} from "tslib";
import { pathToFileURL } from "url";

// This script tests that TypeScript's CJS API is structured
// as expected. It calls "require" as though it were in CWD,
// so it can be tested on a separate install of TypeScript.

const require = createRequire(process.cwd() + "/index.js");
const typescript = process.argv[2];
const resolvedTypeScript = pathToFileURL(require.resolve(typescript)).toString();

console.log(`Testing ${typescript}...`);

// See: https://github.com/microsoft/TypeScript/pull/51474#issuecomment-1310871623
/** @type {[fn: (() => Promise<any>), shouldSucceed: boolean][]} */
const fns = [
    [() => require(typescript).version, true],
    [() => require(typescript).default.version, false],
    [() => __importDefault(require(typescript)).version, false],
    [() => __importDefault(require(typescript)).default.version, true],
    [() => __importStar(require(typescript)).version, true],
    [() => __importStar(require(typescript)).default.version, true],
    [async () => (await import(resolvedTypeScript)).version, true],
    [async () => (await import(resolvedTypeScript)).default.version, true],
];

for (const [fn, shouldSucceed] of fns) {
    let success = false;
    try {
        success = !!(await fn());
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

if (process.exitCode) {
    console.log("fail");
}
else {
    console.log("ok");
}
